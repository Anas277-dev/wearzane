const { APIContracts, APIControllers } = require('authorizenet');

// @desc    Process card payment via Authorize.Net
// @route   POST /api/payment
const processPayment = (req, res) => {
  console.log("Received payment request:", req.body);

  const { cardNumber, expMonth, expYear, cvv, amount } = req.body;

  // Basic validation
  if (!cardNumber || !expMonth || !expYear || !cvv || !amount) {
    return res.status(400).json({ success: false, message: "All payment fields are required" });
  }

  // Merchant Authentication
  const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(process.env.API_LOGIN_ID);
  merchantAuthenticationType.setTransactionKey(process.env.TRANSACTION_KEY);

  // Credit Card Info
  const creditCard = new APIContracts.CreditCardType();
  creditCard.setCardNumber(cardNumber);
  creditCard.setExpirationDate(`${expMonth}${expYear.slice(2)}`); // e.g. "0925"
  creditCard.setCardCode(cvv);

  const paymentType = new APIContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  // Transaction Request
  const transactionRequestType = new APIContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(parseFloat(amount));

  // Create Transaction Request
  const createRequest = new APIContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

  // Execute transaction
  ctrl.execute(() => {
    try {
      const apiResponse = ctrl.getResponse();
      const response = new APIContracts.CreateTransactionResponse(apiResponse);
      console.log("Raw Authorize.Net response:", JSON.stringify(apiResponse, null, 2));

      if (response && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
        const transactionResponse = response.getTransactionResponse();

        if (transactionResponse && transactionResponse.getMessages()) {
          return res.json({
            success: true,
            message: transactionResponse.getMessages().getMessage()[0].getDescription(),
            transactionId: transactionResponse.getTransId()
          });
        } else if (transactionResponse && transactionResponse.getErrors()) {
          return res.status(400).json({
            success: false,
            message: transactionResponse.getErrors().getError()[0].getErrorText()
          });
        } else {
          return res.status(400).json({ success: false, message: "Transaction declined" });
        }
      } else {
        const errorMsg = response.getMessages().getMessage()[0].getText();
        return res.status(400).json({ success: false, message: errorMsg });
      }
    } catch (error) {
      console.error('Transaction error:', error);
      return res.status(500).json({ success: false, message: 'Server error while processing transaction.' });
    }
  });
};

module.exports = { processPayment };