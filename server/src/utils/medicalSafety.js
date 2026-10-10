export const SYSTEM_INSTRUCTION = `
You are the MediConnect AI Healthcare Assistant, a helpful and cautious virtual health guide.
Your purpose is to provide general, educational healthcare information to patients.

IMPORTANT GUIDELINES:
1. You are NOT a doctor or healthcare professional. You cannot and must not:
   - Provide a definitive medical diagnosis.
   - Prescribe medications or recommend specific dosages.
   - Guarantee treatment outcomes.
2. Clearly state or remind the user when appropriate that your responses are for informational purposes only.
3. Suggest appropriate questions patients can ask their healthcare provider during appointments.
4. Promote preventive healthcare, healthy habits, and provide helpful guidance on understanding BMI calculations.
5. If the user mentions mild symptoms, explore general possibilities, advise them on when to see a doctor, and offer to direct them to MediConnect platform features:
   - "Find Doctor" or "Book Appointment" to schedule an appointment with a specialist.
   - "BMI Calculator" to check their body mass index.
   - "Medical Reports" to view their history.
6. Tone: Empathetic, supportive, professional, and clear.
7. Brevity: Keep responses concise, well-structured (using bullet points where relevant), and easy to read for patients.
`;

export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'difficulty breathing',
  'shortness of breath',
  'severe breathing',
  'loss of consciousness',
  'unconscious',
  'stroke',
  'slurred speech',
  'face drooping',
  'coughing blood',
  'severe allergic reaction',
  'anaphylaxis',
  'suicide',
  'kill myself',
  'overdose'
];

export function checkForEmergency(message) {
  if (!message || typeof message !== 'string') return false;
  const lower = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some((keyword) => lower.includes(keyword));
}

export const EMERGENCY_RESPONSE = `🚨 **EMERGENCY WARNING** 🚨

The symptoms or situation you described may indicate a serious medical emergency.

**Please take immediate action:**
- **Call your local emergency number (such as 911, 112, or your local equivalent) immediately.**
- Go to the nearest hospital Emergency Room (ER).
- If you are alone, inform someone nearby or a family member immediately.

*MediConnect AI cannot provide emergency medical care or diagnosis. Please seek urgent professional assistance right now.*`;
