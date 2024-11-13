// client/src/components/dashboard/UserDashboard.jsx
import React from 'react';
import { Card, Text, Group, Button, SimpleGrid } from '@mantine/core';

const UserDashboard = () => {
  return (
    <div>
      <Text size="xl" weight={500} mb={16}>
        Welcome to your Dashboard
      </Text>
      <SimpleGrid cols={3} spacing="lg">
        <Card shadow="sm" padding="lg">
          <Text weight={500} size="lg" mb={4}>
            Model Accuracy
          </Text>
          <Text size="xl" weight={700}>
            91%
          </Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text weight={500} size="lg" mb={4}>
            Active Users
          </Text>
          <Text size="xl" weight={700}>
            2,847
          </Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text weight={500} size="lg" mb={4}>
            Total Predictions
          </Text>
          <Text size="xl" weight={700}>
            124,582
          </Text>
        </Card>
      </SimpleGrid>
      <Button variant="light" color="blue" mt={16}>
        View Recommendations
      </Button>
    </div>
  );
};

export default UserDashboard;