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
  Toolbar,
  InputAdornment
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
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
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
      direction: 'rtl',
      fontFamily: "'Poppins', sans-serif"

    }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          direction: 'ltr',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.primary}20`
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            <IconButton
              edge="start"
              onClick={() => selectedChat && isMobile ? setSelectedChat(null) : navigate(-1)}
              sx={{ color: colors.secondary }}
            >
              <ArrowBackIcon sx={{ transform: 'scaleX(-1)' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        mt: '64px',
        flexDirection: 'row'
      }}>
        {/* Chat List */}
        <Paper
          elevation={0}
          sx={{
            width: isMobile ? '100%' : '30%',
            display: selectedChat && isMobile ? 'none' : 'block',
            borderLeft: `2px solid ${colors.secondary}20`,
            borderRadius: 0
          }}
        >
          {/* Search */}
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
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: colors.tertiary }} />
                  </InputAdornment>
                )
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
                <ListItemAvatar sx={{ml:2}}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    badgeContent={chat.unread}
                    color="error"
                  >
                    <Avatar src={chat.avatar} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                      fontFamily: "'Poppins', sans-serif",
                      color: chat.unread > 0 ? colors.secondary : colors.tertiary,
                      fontWeight: chat.unread > 0 ? 600 : 400
                    }}>
                      {chat.lastMessage}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Area */}
        {selectedChat && (
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '100%' : '70%'
          }}>
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

            {/* Messages */}
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
                      border: `1px solid ${msg.isReceived ? colors.primary + '20' : 'transparent'}`,
                      textAlign: 'right'
                    }}
                  >
                    <Typography variant="body1" sx={{
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {msg.text}
                    </Typography>
                    <Typography variant="caption" sx={{
                      display: 'block',
                      textAlign: 'right',
                      mt: 1,
                      color: msg.isReceived ? colors.tertiary : 'white'
                    }}>
                      {msg.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Input Area */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderTop: `1px solid ${colors.primary}20`,
                backgroundColor: 'white',
                display: 'flex',
                gap: 1
              }}
            >
              <IconButton>
                <EmojiEmotionsIcon sx={{ color: colors.secondary }} />
              </IconButton>
              <IconButton>
                <AttachFileIcon sx={{ color: colors.secondary }} />
              </IconButton>
              <TextField
                fullWidth
                placeholder="הקלד הודעה..."
                variant="outlined"
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: colors.background,
                    fontFamily: "'Poppins', sans-serif"
                  }
                }}
              />
             <IconButton onClick={handleSendMessage}>
  <SendIcon sx={{ color: colors.primary, transform: 'scaleX(-1)' }} />
</IconButton>

            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
