export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-white font-semibold">Vaht∞k</span>. All Rights Reserved.
        </p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-[#ff9d00] transition">Privacy Policy</a>
          <a href="#" className="hover:text-[#ff9d00] transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}

