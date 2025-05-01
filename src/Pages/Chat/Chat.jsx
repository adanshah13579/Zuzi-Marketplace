import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import colors from '../../Style/colors';
import zuziLogo from '../../assets/Zuzi.jpg';

const Chat = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: 'יוחנן כהן',
      lastMessage: 'שלום, האם המוצר עדיין זמין?',
      time: '10:30',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      name: 'שרה לוי',
      lastMessage: 'תודה על העסקה!',
      time: 'אתמול',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    // Add more sample chats as needed
  ];

  const messages = [
    {
      id: 1,
      sender: 'יוחנן כהן',
      text: 'שלום, האם המוצר עדיין זמין?',
      time: '10:30',
      isReceived: true
    },
    {
      id: 2,
      sender: 'You',
      text: 'כן, המוצר עדיין זמין',
      time: '10:32',
      isReceived: false
    },
    // Add more sample messages as needed
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: colors.background,
      direction: 'ltr',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.primary}20`
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && selectedChat ? (
              <IconButton 
                edge="start" 
                onClick={() => setSelectedChat(null)}
                sx={{ color: colors.secondary }}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <IconButton 
                edge="start" 
                onClick={() => navigate(-1)}
                sx={{ color: colors.secondary }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.secondary,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif"
              }}
              onClick={() => navigate(-1)}
            >
              חזרה
            </Typography>
          </Box>
          <Box 
            component="img"
            src={zuziLogo}
            alt="Zuzi Logo"
            sx={{ 
              width: '40px',
              height: '40px',
              borderRadius: '10%',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        display: 'flex', 
        height: 'calc(100vh - 64px)',
        mt: '64px'
      }}>
        {/* Chat List - Always visible on desktop, conditionally visible on mobile */}
        <Paper 
          elevation={0} 
          sx={{ 
            width: isMobile ? '100%' : '30%',
            display: selectedChat && isMobile ? 'none' : 'block',
            borderRight: `2px solid ${colors.secondary}20`,
            borderRadius: 0
          }}
        >
          {/* Search Bar */}
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${colors.primary}20`,
            backgroundColor: 'white'
          }}>
            <TextField
              fullWidth
              placeholder="חיפוש..."
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: <SearchIcon sx={{ color: colors.tertiary, mr: 1 }} />
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: colors.background,
                  fontFamily: "'Poppins', sans-serif"
                }
              }}
            />
          </Box>

          {/* Chat List */}
          <List sx={{ p: 0 }}>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                selected={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  borderBottom: `1px solid ${colors.primary}20`,
                  '&:hover': {
                    backgroundColor: colors.background
                  },
                  '&.Mui-selected': {
                    backgroundColor: `${colors.primary}10`
                  }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={chat.unread}
                    color="error"
                  >
                    <Avatar src={chat.avatar} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 600, 
                        textAlign: 'right',
                        fontFamily: "'Poppins', sans-serif"
                      }}>
                        {chat.name}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: colors.tertiary,
                        fontFamily: "'Poppins', sans-serif"
                      }}>
                        {chat.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography sx={{ 
                      textAlign: 'right',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {chat.lastMessage}
                    </Typography>
                  }
                  secondaryTypographyProps={{
                    sx: {
                      color: chat.unread > 0 ? colors.secondary : colors.tertiary,
                      fontWeight: chat.unread > 0 ? 600 : 400
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Area - Always visible on desktop, conditionally visible on mobile */}
        {selectedChat ? (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            width: isMobile ? '100%' : '70%'
          }}>
            {/* Chat Header */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 0,
                borderBottom: `1px solid ${colors.primary}20`,
                backgroundColor: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={selectedChat.avatar} />
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600, 
                    textAlign: 'right',
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    {selectedChat.name}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: colors.tertiary,
                    textAlign: 'right',
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    פעיל
                  </Typography>
                </Box>
              </Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Paper>

            {/* Messages Area */}
            <Box sx={{ 
              flex: 1, 
              p: 2, 
              overflowY: 'auto',
              backgroundColor: colors.background
            }}>
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.isReceived ? 'flex-start' : 'flex-end',
                    mb: 2
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor: msg.isReceived ? 'white' : colors.primary,
                      color: msg.isReceived ? colors.secondary : 'white',
                      borderRadius: 2,
                      border: `1px solid ${msg.isReceived ? colors.primary + '20' : 'transparent'}`
                    }}
                  >
                    <Typography variant="body1" sx={{ 
                      textAlign: 'right',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {msg.text}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        textAlign: 'left',
                        mt: 1,
                        color: msg.isReceived ? colors.tertiary : 'rgba(255,255,255,0.7)',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                borderRadius: 0,
                borderTop: `1px solid ${colors.primary}20`,
                backgroundColor: 'white'
              }}
            >
              <IconButton>
                <EmojiEmotionsIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="הקלד הודעה..."
                variant="outlined"
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: colors.background,
                    fontFamily: "'Poppins', sans-serif"
                  }
                }}
              />
              <IconButton 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                sx={{ 
                  color: message.trim() ? colors.primary : colors.tertiary 
                }}
              >
                <SendIcon />
              </IconButton>
            </Paper>
          </Box>
        ) : (
          // Empty state when no chat is selected (only visible on desktop)
          !isMobile && (
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: colors.background
            }}>
              <Typography variant="h6" sx={{ 
                color: colors.tertiary, 
                textAlign: 'right',
                fontFamily: "'Poppins', sans-serif"
              }}>
                בחר שיחה מהרשימה
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Chat; 