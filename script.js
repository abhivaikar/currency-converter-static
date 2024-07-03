const apiKey = '51870e5536fea9153961e3ee'; // Replace with your free currency conversion API key
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/'; // Example API URL

const currencies = [
    'CNY', // Chinese Yuan
    'HKD', // Hong Kong Dollar
    'INR', // Indian Rupee
    'IDR', // Indonesian Rupiah
    'JPY', // Japanese Yen
    'KRW', // South Korean Won
    'MYR', // Malaysian Ringgit
    'PKR', // Pakistani Rupee
    'PHP', // Philippine Peso
    'SGD', // Singapore Dollar
    'TWD', // New Taiwan Dollar
    'THB', // Thai Baht
    'VND'  // Vietnamese Dong
];

// Populate the dropdowns with currency options
$(document).ready(function() {
    const sortedCurrencies = currencies.sort();
    sortedCurrencies.forEach(currency => {
        $('#from-currency, #to-currency').append(new Option(currency, currency));
    });
});

// Handle conversion
$('#convert-button').click(function() {
    const amount = $('#amount').val();
    const fromCurrency = $('#from-currency').val();
    const toCurrency = $('#to-currency').val();

    if (amount && fromCurrency && toCurrency) {
        $.getJSON(`${apiUrl}${fromCurrency}`, function(data) {
            const rate = data.rates[toCurrency];
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                $('#result').text(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
            } else {
                $('#result').text('Conversion rate not available.');
            }
        }).fail(function() {
            $('#result').text('Error retrieving data.');
        });
    } else {
        $('#result').text('Please enter an amount and select both currencies.');
    }
});
