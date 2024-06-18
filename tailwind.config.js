export default {
    content: ['./index.html'],
    theme: {
        extend: {
            borderWidth: {
                '1': '1px'
            },
            colors: {
                'primary-border': '#333',
                'primary': '#000',
                'secondary': '#0a0a0a',
                'tertiary': '#f2f2f2',
            },
            borderColor: theme => ({
                ...theme('colors'),
            })
        },
    },
    plugins: [],
};
