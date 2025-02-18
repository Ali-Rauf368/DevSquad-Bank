export const getResponse = (message) => {
  const responses = {
    "what is a savings account?": "A savings account is a type of bank account where you can deposit money and earn interest over time.",
    "how can i open a checking account?": "To open a checking account, you typically need to visit your bank or apply online, providing identification and proof of address.",
    "what is an interest rate on a loan?": "The interest rate on a loan is the cost of borrowing money, expressed as a percentage of the loan amount, and it varies depending on the lender and type of loan.",
    "how do i apply for a credit card?": "You can apply for a credit card online, by visiting a bank branch, or through a credit card company. You’ll need to provide personal information and financial details.",
    "what is a fixed deposit?": "A fixed deposit is a type of investment where you deposit money with a bank for a fixed tenure at a fixed interest rate, and you can't withdraw it until the term ends.",
    "what is the difference between a debit and credit card?": "A debit card allows you to access funds in your bank account, while a credit card allows you to borrow money up to a certain limit, which you must pay back with interest.",
    "how can i transfer money between accounts?": "You can transfer money between accounts using online banking, mobile apps, or by visiting a bank branch. You may need to provide the account details of the recipient.",
    "what is mobile banking?": "Mobile banking is the use of a smartphone or tablet to perform financial transactions, such as checking account balances, transferring funds, or paying bills.",
    "how do i check my bank account balance?": "You can check your account balance using your bank’s mobile app, online banking, or by visiting an ATM.",
    "what is online banking?": "Online banking allows you to perform financial transactions over the internet, such as checking balances, paying bills, or transferring funds.",
    "how do i close my account?": "To close your account, you typically need to contact your bank, either in person or online, and provide identification and account details. Some banks may require you to withdraw any remaining funds.",
    "what should i do if i lose my debit/credit card?": "If you lose your debit or credit card, immediately report it to your bank to block the card and prevent unauthorized transactions.",
    "how do i change my account details?": "You can change your account details by visiting your bank branch or using your bank’s online platform. You may need to provide verification information.",
    "how do i report a fraudulent transaction?": "If you notice a fraudulent transaction, immediately contact your bank to report the issue and block your card or account if necessary.",
    "what are the fees for using an atm?": "ATM fees may vary depending on your bank and the ATM provider. Typically, banks charge fees for using ATMs outside their network.",
    "what is an overdraft facility?": "An overdraft facility allows you to withdraw more money than you have in your account, up to a certain limit, and you’ll need to pay it back with interest.",
    "what is a loan approval process?": "The loan approval process typically involves submitting an application, providing required documents, and having your creditworthiness assessed by the lender.",
    "how can i check my credit score?": "You can check your credit score through various online services, or you can request it from credit reporting agencies.",
    "what are the different types of loans offered by the bank?": "Banks offer various types of loans, including personal loans, home loans, auto loans, and student loans, each with specific terms and conditions.",
    "what is the process for applying for a mortgage loan?": "To apply for a mortgage loan, you’ll need to provide personal and financial information, including income, employment status, and credit history, and then the bank will assess your eligibility.",
    "what is financial planning and how can it help me?": "Financial planning involves setting goals for your money, creating a budget, saving, and investing. It helps ensure you have a strategy to manage your finances effectively.",
    "what is a foreign exchange service?": "A foreign exchange service allows you to exchange one currency for another, and it’s typically offered by banks, currency exchange offices, or online platforms.",
    "can i get a loan with bad credit?": "It may be more difficult to get a loan with bad credit, but some lenders offer options, including secured loans or loans with higher interest rates.",
    "what is a personal loan?": "A personal loan is an unsecured loan that you can use for various purposes, such as debt consolidation, medical expenses, or home improvements.",
    "how can i set up direct deposit for my salary?": "You can set up direct deposit by providing your bank account information to your employer, so they can deposit your salary directly into your account."
  };

  const normalizedMessage = message.trim().toLowerCase();
  return responses[normalizedMessage] || "Sorry, I don't understand. Could you rephrase?";
};
