import aiService from '../services/aiService.js';

export const chat = async (req, res, next) => {
  const { message, history } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
  }

  try {
    const result = await aiService.generateResponse(message, history || []);

    res.status(200).json({
      success: true,
      data: {
        reply: result.reply,
        isEmergency: !!result.isEmergency
      }
    });
  } catch (error) {
    next(error); // Forward to global error handler
  }
};

export const reset = (req, res) => {
  // If we were using a DB, we'd reset the session here.
  // With memory based or client-managed history, we just respond success.
  res.status(200).json({ success: true, message: 'Conversation state cleared.' });
};
