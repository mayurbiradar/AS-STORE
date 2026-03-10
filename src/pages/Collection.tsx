import Header from '../components/Header';
import Footer from '../components/Footer';
import Products from '../components/Products';

export default function Collection() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Products />
      </main>
    </div>
  );
}
