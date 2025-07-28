"use client";

import {
  Avatar,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  InputLabel,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  sender: "user" | "admin";
  name: string;
  avatarUrl: string;
  message: string;
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "user",
    name: "جان اسمیت",
    avatarUrl: "/assets/images/default-avatar.png",
    message: "سلام این یک پیام تست از طرف کاربر است برای تست متن ارسال شده.",
    timestamp: new Date("2025/07/28 15:11:21").toLocaleString("fa-IR"),
  },
  {
    id: "2",
    sender: "admin",
    name: "سعید پناهی",
    avatarUrl: "/assets/images/avatar.png",
    message:
      "پاسخ ادمین لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.",
    timestamp: new Date("2025/07/28 16:20:21").toLocaleString("fa-IR"),
  },
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "admin",
      name: "سعید پناهی",
      avatarUrl: "/assets/images/avatar.png",
      message: text.trim(),
      timestamp: new Date().toLocaleString("fa-IR"),
    };
    setMessages((prev) => [...prev, newMessage]);
    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      overflow="hidden"
      bgcolor="background.paper"
    >
      {/* Chat Messages */}
      <Box
        ref={scrollRef}
        flex={1}
        overflow="auto"
        p={2}
        sx={{
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray.400",
            borderRadius: "4px",
          },
          maxHeight: "calc(100dvh - 350px)",
        }}
      >
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              alignSelf={msg.sender === "admin" ? "flex-start" : "flex-end"}
              maxWidth="70%"
            >
              <Paper
                elevation={0}
                sx={{
                  bgcolor: msg.sender === "admin" ? "success.50" : "primary.50",
                  p: 2,
                  borderRadius: "10px",
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar
                    src={msg.avatarUrl}
                    alt={msg.name}
                    sx={{ width: 24, height: 24, ml: 1 }}
                  />
                  <Typography fontWeight="bold" fontSize="0.875rem">
                    {msg.name}
                  </Typography>
                </Box>
                <Typography fontSize="0.95rem">{msg.message}</Typography>
                <Typography
                  variant="caption"
                  display="block"
                  mt={1}
                  color="text.secondary"
                  textAlign="left"
                >
                  {msg.timestamp}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Message Input */}
      <Box display={"flex"} flexDirection={"column"} gap={1} mt={4}>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <InputLabel>متن تیکت</InputLabel>
          <TextField
            fullWidth
            placeholder="یک متن وارد کنید..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="small"
            multiline
            minRows={3}
            maxRows={6}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                  borderWidth: "1px",
                },
              },
            }}
          />
          <Box display="flex" alignItems="center" gap={1} my={1}>
            <Checkbox
              id="chk"
              sx={{
                p: 0,
              }}
            />
            <Typography component={FormLabel} htmlFor="chk">
              {" "}
              آیا این پیام محرمانه است؟
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "gray.300",
          }}
        >
          <Button
            onClick={handleSend}
            variant="contained"
            sx={{
              borderRadius: "12px",
              px: 5,
              py: 1.5,
            }}
          >
            ارسال پیام
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
