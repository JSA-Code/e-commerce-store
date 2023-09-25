//helper module for layout
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';
import './globals.css';

export default function Layout({ children }) {
  // SET THEME CHANGE FUNCTIONALITY HERE
  return (
    <html>
      <body>
        <Provider>
          {/* <div className="relative overflow-hidden"> */}
          {/* <div className="flex flex-col items-center max-w-2xl w-full mx-auto"> */}
          <NavBar />
          <main className="relative w-full overflow-hidden bg-soft-blue dark:bg-soft-blue">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
