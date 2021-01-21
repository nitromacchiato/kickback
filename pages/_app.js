import '../styles/globals.css'
import { Provider } from 'next-auth/client'


function MyApp({ Component, pageProps }) {
  
  return (

    
    <Provider session={pageProps.session}>
      <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>
      <Component {...pageProps} />
    </Provider>


  );
}

export default MyApp;
