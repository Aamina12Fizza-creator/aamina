import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Star,
  Check,
  ShoppingBag,
  ExternalLink,
  Truck,
} from 'lucide-react';
import { GROCERY_STORES } from '../data/storesData';
import { TRANSLATIONS } from '../data/translations';

interface NearbyStoresProps {
  language: 'en' | 'ur';
}

export const NearbyStores: React.FC<NearbyStoresProps> = ({ language }) => {
  const isUrdu = language === 'ur';
  const t = TRANSLATIONS[language].stores;

  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['All', 'Lahore', 'Karachi', 'London', 'New York'];

  const filteredStores = GROCERY_STORES.filter((store) => {
    const matchesCity = selectedCity === 'All' || store.city === selectedCity;
    const matchesSearch =
      searchQuery.trim() === '' ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.inStockIngredients.some((ing) =>
        ing.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCity && matchesSearch;
  });

  return (
    <section className="bg-white border border-[#E8DEC8] rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-[#F0EAE1]">
        <span className="text-xs uppercase tracking-wider text-[#C4677E] font-semibold flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {isUrdu ? 'مقامی فوڈ سورسنگ' : 'Local Food Sourcing & Grocery Access'}
        </span>
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#4A2234] mt-0.5">
          {t.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">{t.subtitle}</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-[#4A2234] text-white'
                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-stone-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Ingredient Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchMissing}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-[#FAF7F2] border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4677E]"
          />
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-[#FAF7F2] border border-[#EDE4D5] rounded-xl p-5 flex flex-col justify-between hover:border-[#C4677E]/50 transition-colors shadow-2xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-white border border-[#E8DEC8] text-[#4A2234] rounded">
                  {store.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#C4677E] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {store.rating}
                </span>
              </div>

              <h3 className="font-semibold text-sm text-[#4A2234] leading-tight">
                {store.name}
              </h3>

              <div className="text-xs text-stone-500 mt-2 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{store.address}, {store.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{store.phone}</span>
                </div>
              </div>

              {/* In stock badges */}
              <div className="mt-4 pt-3 border-t border-[#EDE4D5]">
                <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                  {t.inStock}:
                </span>
                <div className="flex flex-wrap gap-1">
                  {store.inStockIngredients.map((ing, idx) => {
                    const isQueried =
                      searchQuery.trim() !== '' &&
                      ing.toLowerCase().includes(searchQuery.toLowerCase());
                    return (
                      <span
                        key={idx}
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          isQueried
                            ? 'bg-[#EEF5EE] border-emerald-400 text-emerald-900 font-semibold'
                            : 'bg-white border-stone-200 text-stone-600'
                        }`}
                      >
                        {ing}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-[#EDE4D5] flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-stone-500">
                ~{store.distanceKm} km away
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${store.name} ${store.address} ${store.city}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A2234] hover:text-[#C4677E] transition-colors"
              >
                <span>{t.directions}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
