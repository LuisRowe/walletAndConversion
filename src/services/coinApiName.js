const coinApi = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  const coinsNames = Object.keys(requestJson);
  const coinsNamesWithoutUSDT = coinsNames.filter((coin) => coin !== 'USDT');
  return coinsNamesWithoutUSDT;
};

export default coinApi;
