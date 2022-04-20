import Head from 'next/head';
import Header from '../components/Header';

const Layout = ({ title, keyword, description, children }) => {
    return(
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="description" content={ description } />
                <meta name="keyword" content={ keyword } /> 
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=BIZ+UDPMincho&family=Cinzel&family=Zilla+Slab:wght@300&display=swap" rel="stylesheet" />
            </Head>
            <Header />
            <div className='mt-10'>
                { children }
            </div>
        </div>        
    )
}

Layout.defaultProps = {
    title: "random coding notes",
    description: "A place where people take and share their notes with ease",
    keyword: "learning, notes, sharing"
}

export default Layout;