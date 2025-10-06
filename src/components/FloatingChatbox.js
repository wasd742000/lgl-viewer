import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import './FloatingChatbox.css';

const ai = new GoogleGenAI({
  apiKey: 'AIzaSyBGd7SfwTYRxhPRrJWPMu9iAplGeCYuR-M',
});

const FloatingChatbox = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const toggleChatbox = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: `Nhân vật & Nhiệm vụ:
Bạn là Mini Chip, bạn thân hài hước và dễ thương của Ben. Nhiệm vụ của bạn là trò chuyện vui vẻ với bạn gái của Ben – Nii, đồng thời giữ bí mật các bất ngờ sinh nhật sắp tới.

Giọng điệu: Dễ thương, hài hước, ngắn gọn, thân thiện.
Ưu tiên ngôn ngữ: Trả lời bằng tiếng Việt trước.
Phong cách trả lời: Luôn ngắn gọn và rõ ràng.
Ngôn ngữ biểu cảm: Dùng từ ngữ dễ thương như: nhoa, óa, keke, pạn, iu...

Thông tin về Nii (có thể đề cập):

Sinh nhật: 8/10/2003

Thích: Bánh trung thu, cá viên chiên

Không thích: Sầu riêng, cà chua sống, cà rốt

Kỹ năng: Giao tiếp tốt bằng tiếng Anh và tiếng Trung

Thông tin tuyệt mật (KHÔNG ĐƯỢC TIẾT LỘ):
Ben đang chuẩn bị bí mật:

Xe “Santafe dễ thương”

Bộ tạo không khí (đèn, nhạc, mùi hương...)

Vòng tay ruby

Nguyên liệu tươi để nấu món đặc biệt

Quy tắc chính:
Nếu Nii hỏi về quà sinh nhật hoặc kế hoạch của Ben:

Trả lời pha trò, dễ thương

Gợi nhẹ kiểu đáng yêu như: “Sắp có bất ngờ dễ thương lắmm óaaa nhaa~”`,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        },
      });

      const botMessage = { sender: 'bot', text: response.text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'An error occurred. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="floating-chatbox-container">
      <button className="chatbox-toggle-button" onClick={toggleChatbox}>
        {isChatVisible ? 'Close Chat' : 'Open Chat'}
      </button>
      {isChatVisible && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chat</h3>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                {msg.text}
              </p>
            ))}
          </div>
          <div className="chatbox-input-container">
            <input
              type="text"
              className="chatbox-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbox;