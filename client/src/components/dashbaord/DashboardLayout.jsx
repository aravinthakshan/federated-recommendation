// client/src/components/dashboard/DashboardLayout.jsx
import React from 'react';
import { Navbar, Group, Code, ScrollArea, Burger, Box, Drawer, Collapse } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Home, User, TrendingUp, Settings } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [opened, setOpened] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex">
      <Navbar
        width={{ base: 300 }}
        p="md"
        className="shadow-lg"
      >
        <Navbar.Section grow>
          <Group className="mb-8" position="apart">
            <Box>
              <Code>Federated Recommender</Code>
            </Box>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color="#212121"
            />
          </Group>
          <ScrollArea>
            <Navbar.Link
              icon={<Home size={16} />}
              label="Dashboard"
              onClick={() => navigate('/dashboard')}
            />
            <Navbar.Link
              icon={<User size={16} />}
              label="Profile"
              onClick={() => navigate('/profile')}
            />
            <Navbar.Link
              icon={<TrendingUp size={16} />}
              label="Analytics"
              onClick={() => navigate('/analytics')}
            />
            <Navbar.Link
              icon={<Settings size={16} />}
              label="Settings"
              onClick={() => navigate('/settings')}
            />
          </ScrollArea>
        </Navbar.Section>
      </Navbar>

      <div className="flex-1 p-8">
        {children}
      </div>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="xl"
        size="md"
      >
        <Collapse in={opened}>
          <Navbar.Link
            icon={<Home size={16} />}
            label="Dashboard"
            onClick={() => navigate('/dashboard')}
          />
          <Navbar.Link
            icon={<User size={16} />}
            label="Profile"
            onClick={() => navigate('/profile')}
          />
          <Navbar.Link
            icon={<TrendingUp size={16} />}
            label="Analytics"
            onClick={() => navigate('/analytics')}
          />
          <Navbar.Link
            icon={<Settings size={16} />}
            label="Settings"
            onClick={() => navigate('/settings')}
          />
        </Collapse>
      </Drawer>
    </div>
  );
};

export default DashboardLayout;