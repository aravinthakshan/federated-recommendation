// client/src/components/dashboard/AdminDashboard.jsx
import React from 'react';
import { Text, Group, Button, SimpleGrid, Card, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from '@mantine/core';
import { TrendingUp, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const metrics = [
    { name: 'Jan', accuracy: 84, engagement: 75 },
    { name: 'Feb', accuracy: 87, engagement: 82 },
    { name: 'Mar', accuracy: 89, engagement: 85 },
    { name: 'Apr', accuracy: 91, engagement: 88 },
  ];

  return (
    <div>
      <Text size="xl" weight={500} mb={16}>
        Admin Dashboard
      </Text>
      <SimpleGrid cols={3} spacing="lg">
        <Card shadow="sm" padding="lg">
          <Group position="apart">
            <div>
              <Text weight={500} size="lg" mb={4}>
                Model Accuracy
              </Text>
              <Text size="xl" weight={700}>
                91%
              </Text>
            </div>
            <TrendingUp size={32} />
          </Group>
        </Card>
        <Card shadow="sm" padding="lg">
          <Group position="apart">
            <div>
              <Text weight={500} size="lg" mb={4}>
                Active Users
              </Text>
              <Text size="xl" weight={700}>
                2,847
              </Text>
            </div>
            <TrendingUp size={32} />
          </Group>
        </Card>
        <Card shadow="sm" padding="lg">
          <Group position="apart">
            <div>
              <Text weight={500} size="lg" mb={4}>
                Total Predictions
              </Text>
              <Text size="xl" weight={700}>
                124,582
              </Text>
            </div>
            <TrendingUp size={32} />
          </Group>
        </Card>
      </SimpleGrid>
      <Card shadow="sm" padding="lg" mt={16}>
        <Text weight={500} size="lg" mb={8}>
          Performance Metrics
        </Text>
        <LineChart width={800} height={400} data={metrics}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#2563eb" />
          <Line type="monotone" dataKey="engagement" stroke="#7c3aed" />
        </LineChart>
      </Card>
      <Group position="right" mt={16}>
        <Button variant="light" color="blue" leftIcon={<Settings size={16} />}>
          Settings
        </Button>
      </Group>
    </div>
  );
};

export default AdminDashboard;