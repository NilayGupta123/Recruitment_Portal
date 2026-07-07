import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
export default function PublicLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>

    </div>
  );
}
