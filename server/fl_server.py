import flwr as fl
import torch
from torch import nn
import numpy as np
from typing import List, Tuple
from collections import OrderedDict

class RecommenderModel(nn.Module):
    def __init__(self, num_users, num_items, embedding_dim=100):
        super().__init__()
        self.user_embeddings = nn.Embedding(num_users, embedding_dim)
        self.item_embeddings = nn.Embedding(num_items, embedding_dim)
        
    def forward(self, user_ids, item_ids):
        user_embeds = self.user_embeddings(user_ids)
        item_embeds = self.item_embeddings(item_ids)
        return torch.sum(user_embeds * item_embeds, dim=1)

class FederatedServer:
    def __init__(self, num_users=1000, num_items=1000):
        self.model = RecommenderModel(num_users, num_items)
        
    def weighted_average(self, metrics: List[Tuple[int, float]]) -> float:
        weights = [num_examples for num_examples, _ in metrics]
        values = [value for _, value in metrics]
        return sum([w * v for w, v in zip(weights, values)]) / sum(weights)
    
    def aggregate_fit(self, results):
        weights_results = [
            (parameters, num_examples)
            for parameters, num_examples in results
        ]
        
        return self.aggregate_weights(weights_results)
    
    def aggregate_weights(self, results):
        weights_prime = []
        total_examples = sum([num_examples for _, num_examples in results])
        
        for idx_layer in range(len(results[0][0])):
            layer_updates = []
            for parameters, num_examples in results:
                layer_updates.append(
                    parameters[idx_layer] * num_examples / total_examples
                )
            weights_prime.append(torch.sum(torch.stack(layer_updates), dim=0))
            
        return weights_prime

    def start_server(self, num_rounds=3):
        strategy = fl.server.strategy.FedAvg(
            fraction_fit=0.3,
            fraction_evaluate=0.3,
            min_fit_clients=2,
            min_evaluate_clients=2,
            min_available_clients=2,
            evaluate_fn=None,
            on_fit_config_fn=None,
            initial_parameters=None,
        )

        fl.server.start_server(
            server_address="0.0.0.0:8080",
            config=fl.server.ServerConfig(num_rounds=num_rounds),
            strategy=strategy,
        )
