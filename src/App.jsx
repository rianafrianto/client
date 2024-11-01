// App.jsx
import React from 'react';
import { CardProvider } from './context/CardContext';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Import Sidebar
import Home from './pages/Home';
import AddCard from './pages/AddCard';
import ManageCards from './pages/ManageCard';
import NotFound from './components/NotFound';

const { Header, Content } = Layout;

const App = () => {
  return (
    <CardProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Sider width={200} className="site-layout-background">
            <Sidebar /> 
          </Layout.Sider>
          <Layout>
            <Header className="bg-blue-500 text-white text-center" style={{ padding: 0 }}>
              <h1 className="text-xl font-semibold mt-4">Content Management Platform</h1>
            </Header>
            <Content style={{ padding: '24px 24px 0', margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-card" element={<AddCard />} />
                <Route path="/manage-cards" element={<ManageCards />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </CardProvider>
  );
};

export default App;
