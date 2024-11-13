// client/src/components/auth/AuthLayout.jsx
import React from 'react';
import { Paper, Title, Text } from '@mantine/core';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Paper shadow="md" p={30} radius="md" w={400}>
        <Title order={2} className="text-center mb-6">
          Federated Recommender
        </Title>
        {children}
      </Paper>
    </div>
  );
};

export default AuthLayout;