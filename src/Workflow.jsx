import React, { useState, useEffect } from 'react';
import {
  ReactFlow,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';


const Workflow = () => {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 30, y: 50 } },
    { id: '2', data: { label: 'Action Node 1' }, position: { x: 50, y: 273 } },
    { id: '3', data: { label: 'Decision Node' }, position: { x: 120, y: 150 } },
    { id: '4', data: { label: 'Action Node 2' }, position: { x: 350, y: 268 } },
    { id: '5', data: { label: 'Fork Node' }, position: { x: 350, y: 379 } },
    { id: '6', data: { label: 'Terminal Node' }, position: { x: 100, y: 589 } },
  ]);

const [edges, setEdges] = useState([
  { id: 'e1-1', source: '1', target: '3' },
  { id: 'e1-3', source: '1', target: '2' },
  { id: 'e1-3', source: '3', target: '2' },
  { id: 'e1-4', source: '3', target: '4' },
  { id: 'e1-5', source: '4', target: '5' },
  { id: 'e1-6', source: '5', target: '6' },
]);

const [open, setOpen] = useState(false);
const [selectedNode, setSelectedNode] = useState(null);
const [nodeLabel, setNodeLabel] = useState('');
const [formData, setFormData] = useState({ username: '', age: '', department: '' });
const [users, setUsers] = useState([]);

useEffect(() => {
  const savedUsers = localStorage.getItem('users');
  if (savedUsers) {
    setUsers(JSON.parse(savedUsers));
  }
}, []);

const handleOpen = (node) => {
  if (node.data.label === 'Start Node') {
    setSelectedNode(node);
    setNodeLabel(node.data.label);
    setOpen(true);
  } else if (node.data.label === 'Fork Node') {
    createUsernameChildNodes(node);
  }
};

const handleClose = () => {
  setOpen(false);
  setSelectedNode(null);
  setFormData({ username: '', age: '', department: '' });
};

const handleSave = () => {
  const updatedUsers = [...users, formData];
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  setUsers(updatedUsers);
  handleClose();
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const createUsernameChildNodes = (node) => {
  const newNodes = users.map((user, index) => ({
    id: `${node.id}-${index}`,
    data: { label: user.username },
    position: { x: node.position.x + 100, y: node.position.y + (index + 1) * 50 },
    draggable: true,
  }));

  const terminalNodeId = '6';

  const newEdges = newNodes.map((childNode) => ({
    id: `e${childNode.id}-${terminalNodeId}`,
    source: childNode.id,
    target: terminalNodeId,
  }));

  setNodes((prevNodes) => [...prevNodes, ...newNodes]);
  setEdges((prevEdges) => [...prevEdges, ...newEdges]);
};

const onNodeClick = (event, node) => {
  handleOpen(node);
};

return (
  <div style={{ height: '100vh', width: '100vw' }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={onNodeClick}
      className="react-flow-basic-example"
      minZoom={0.2}
      maxZoom={4}
      fitView
      selectNodesOnDrag={false}
      elevateEdgesOnSelect
      elevateNodesOnSelect={false}
    />

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Node Configuration</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Age"
          type="text"
          fullWidth
          variant="outlined"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Department"
          type="text"
          fullWidth
          variant="outlined"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
};

export default Workflow;