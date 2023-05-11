module.exports = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:8080/login',
          },
        ],
      },
    ];
  },
};