# client/fl_client.py
import flwr as fl
import torch
from torch import nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, Dataset
import numpy as np

class UserItemDataset(Dataset):
    def __init__(self, user_ids, item_ids, ratings):
        self.user_ids = torch.LongTensor(user_ids)
        self.item_ids = torch.LongTensor(item_ids)
        self.ratings = torch.FloatTensor(ratings)
        
    def __len__(self):
        return len(self.ratings)
        
    def __getitem__(self, idx):
        return (self.user_ids[idx], self.item_ids[idx]), self.ratings[idx]

class RecommenderClient(fl.client.NumPyClient):
    def __init__(self, model, train_data, test_data):
        self.model = model
        self.train_data = train_data
        self.test_data = test_data
        self.optimizer = torch.optim.Adam(model.parameters())
        
    def get_parameters(self, config):
        return [val.cpu().numpy() for _, val in self.model.state_dict().items()]
        
    def set_parameters(self, parameters):
        params_dict = zip(self.model.state_dict().keys(), parameters)
        state_dict = OrderedDict({k: torch.tensor(v) for k, v in params_dict})
        self.model.load_state_dict(state_dict, strict=True)
        
    def fit(self, parameters, config):
        self.set_parameters(parameters)
        
        train_loader = DataLoader(
            self.train_data,
            batch_size=32,
            shuffle=True
        )
        
        # Local training
        self.model.train()
        for epoch in range(5):  # Local epochs
            for batch_idx, ((user_ids, item_ids), ratings) in enumerate(train_loader):
                self.optimizer.zero_grad()
                pred = self.model(user_ids, item_ids)
                loss = F.mse_loss(pred, ratings)
                loss.backward()
                self.optimizer.step()
                
        return self.get_parameters(config={}), len(self.train_data), {}
        
    def evaluate(self, parameters, config):
        self.set_parameters(parameters)
        
        test_loader = DataLoader(
            self.test_data,
            batch_size=32,
            shuffle=False
        )
        
        loss = 0.0
        correct = 0
        self.model.eval()
        
        with torch.no_grad():
            for ((user_ids, item_ids), ratings) in test_loader:
                pred = self.model(user_ids, item_ids)
                loss += F.mse_loss(pred, ratings, reduction="sum").item()
                
        loss /= len(test_loader.dataset)
        return loss, len(test_loader.dataset), {"mse": loss}

def start_client(train_data, test_data, server_address="127.0.0.1:8080"):
    # Initialize model
    model = RecommenderModel(num_users=1000, num_items=1000)
    
    # Create client
    client = RecommenderClient(model, train_data, test_data)
    
    # Start client
    fl.client.start_numpy_client(server_address, client=client)

if __name__ == "__main__":
    # Example usage
    # Generate some dummy data
    np.random.seed(42)
    n_samples = 1000
    
    user_ids = np.random.randint(0, 1000, n_samples)
    item_ids = np.random.randint(0, 1000, n_samples)
    ratings = np.random.rand(n_samples)
    
    # Split data
    train_size = int(0.8 * n_samples)
    train_data = UserItemDataset(
        user_ids[:train_size],
        item_ids[:train_size],
        ratings[:train_size]
    )
    test_data = UserItemDataset(
        user_ids[train_size:],
        item_ids[train_size:],
        ratings[train_size:]
    )
    
    start_client(train_data, test_data)