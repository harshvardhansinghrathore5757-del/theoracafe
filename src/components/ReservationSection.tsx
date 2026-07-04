import { useState } from 'react';
import { SEATING_ZONES } from '../data/menu';
import { SeatingZoneId, ReservationDetail } from '../types';
import { Calendar as CalendarIcon, Users, Clock, MapPin, CheckCircle, ChevronRight, Award, Trash2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReservationSection() {
  const [step, setStep] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('7:00 PM');
  const [selectedZone, setSelectedZone] = useState<SeatingZoneId>('royal-hall');
  
  // Passenger info
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formRequests, setFormRequests] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Finished reservation state (acts as a database model in memory)
  const [completedBooking, setCompletedBooking] = useState<ReservationDetail | null>(null);
  const [bookingId, setBookingId] = useState<string>('');

  const times = [
    { label: 'Brunch & Noon', slots: ['10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM'] },
    { label: 'High Tea & Twilight', slots: ['4:30 PM', '5:30 PM', '6:30 PM'] },
    { label: 'Imperial Dine', slots: ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'] }
  ];

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Validate details
      const newErrors: { [key: string]: string } = {};
      if (!formName.trim()) newErrors.name = 'Full Name is required';
      if (!formEmail.trim() || !/^\S+@\S+\.\S+$/.test(formEmail)) newErrors.email = 'Valid Email is required';
      if (!formPhone.trim()) newErrors.phone = 'Phone number is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      triggerSubmit();
    }
  };

  const triggerSubmit = () => {
    const newBooking: ReservationDetail = {
      customerName: formName,
      email: formEmail,
      phone: formPhone,
      date,
      time: selectedTime,
      guests,
      zoneId: selectedZone,
      specialRequests: formRequests
    };

    // Calculate mock booking reference ID
    const randomHash = Math.random().toString(36).substring(2, 7).toUpperCase();
    const mockId = `ORA-${date.replace(/-/g, '').slice(2, 6)}-${randomHash}`;
    
    setCompletedBooking(newBooking);
    setBookingId(mockId);
    setStep(3);
  };

  const resetAll = () => {
    setStep(1);
    setGuests(2);
    setSelectedTime('7:00 PM');
    setSelectedZone('royal-hall');
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormRequests('');
    setCompletedBooking(null);
    setBookingId('');
  };

  return (
    <section id="reservation" className="py-24 bg-[#fdfcf8] text-[#1c1917] border-y border-stone-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-2">
            Secure Sanctuary Tableside
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-black tracking-tight text-[#1c1917] mb-4">
            Seat Reservations
          </h2>
          <div className="w-12 h-[1px] bg-gold-500/60 mx-auto" />
        </div>

        {/* Wizard Panel */}
        <div className="bg-stone-50 border border-stone-200 rounded-none shadow-xs overflow-hidden min-h-[450px]">
          {/* Header Progress status bar */}
          <div className="bg-stone-100 px-8 py-5 border-b border-stone-200 flex justify-between items-center text-xs text-stone-600">
            <span className="font-mono">
              {step === 1 && 'Step 01 of 02: Selection & Mood'}
              {step === 2 && 'Step 02 of 02: Contact Particulars'}
              {step === 3 && 'Reservation Confirmed'}
            </span>
            <div className="flex gap-1">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-10 rounded-none transition-colors ${
                    step > i ? 'bg-gold-600' : step === i ? 'bg-gold-500' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 text-[#1c1917]"
              >
                {/* 1. Date & Guests row */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Guests */}
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-3 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-gold-600" />
                      Number of Guests
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          key={num}
                          id={`guests-btn-${num}`}
                          onClick={() => setGuests(num)}
                          type="button"
                          className={`flex-1 max-w-10 h-10 rounded-none border font-mono text-xs cursor-pointer ${
                            guests === num
                              ? 'bg-[#1c1917] text-white font-bold border-black'
                              : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date selection */}
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5 text-gold-600" />
                      Desired Date
                    </label>
                    <input
                      type="date"
                      id="reservation-date-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white border border-stone-200 rounded-none px-4 py-2.5 text-xs text-[#1c1917] focus:outline-none focus:border-gold-500 font-mono"
                    />
                  </div>
                </div>

                {/* 2. Times Selector Grid */}
                <div className="mb-8 border-t border-stone-200 pt-8">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-4 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-600" />
                    Preferred Hour
                  </label>
                  <div className="space-y-4">
                    {times.map((session, sIdx) => (
                      <div key={sIdx} className="grid grid-cols-5 gap-2 items-center">
                        <span className="col-span-1 text-[10px] font-sans text-stone-500 uppercase tracking-wider font-semibold">{session.label}</span>
                        <div className="col-span-4 flex gap-2 overflow-x-auto pb-1">
                          {session.slots.map((t) => (
                            <button
                              key={t}
                              id={`time-btn-${t}`}
                              onClick={() => setSelectedTime(t)}
                              type="button"
                              className={`px-3 py-2 text-[11px] font-mono rounded-none border shrink-0 cursor-pointer ${
                                selectedTime === t
                                  ? 'bg-gold-500/10 border-gold-500 text-gold-700 font-bold'
                                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Zone Area Map / Selector */}
                <div className="mb-10 border-t border-stone-200 pt-8">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-4 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    Chamber Zone Preference
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {SEATING_ZONES.map((zone) => {
                      const isSelected = selectedZone === zone.id;
                      return (
                        <button
                          key={zone.id}
                          id={`zone-btn-${zone.id}`}
                          onClick={() => setSelectedZone(zone.id)}
                          type="button"
                          className={`text-left p-5 border rounded-none transition-all flex flex-col justify-between h-40 cursor-pointer ${
                            isSelected
                              ? 'border-gold-500 bg-gold-500/10'
                              : 'border-stone-200 bg-white hover:bg-stone-50'
                          }`}
                        >
                          <div>
                            <span className="font-serif text-sm font-bold block text-[#1c1917] mb-1">
                              {zone.name}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-gold-600 font-bold">
                              {zone.vibe}
                            </span>
                          </div>
                          <p className="text-stone-600 text-[10px] leading-relaxed line-clamp-2 mt-2 font-light">
                            {zone.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Floor Plan interactive simulation */}
                <div className="mb-10 p-5 bg-white rounded-none border border-stone-200 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-4">
                    Chamber Floor Plan Preview ({selectedZone === 'royal-hall' ? 'Heritage Hall' : 'Monsoon Sanctuary'})
                  </span>
                  
                  {/* Standard floor structure */}
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-4 max-w-lg mx-auto py-3">
                    {[...Array(14)].map((_, i) => {
                      const isBooths = i % 3 === 0;
                      const isOccupied = i === 3 || i === 7 || i === 11;
                      const tableNo = i + 1;
                      return (
                        <div
                          key={i}
                          className={`p-3 rounded-none border flex flex-col items-center justify-center transition-all ${
                            isOccupied 
                              ? 'border-red-200 bg-red-50 text-red-500/50 cursor-not-allowed'
                              : 'border-stone-200 bg-gold-400/5 text-stone-700 hover:border-gold-500'
                          }`}
                          title={isOccupied ? `Table ${tableNo} is occupied` : `Table ${tableNo} is available`}
                        >
                          <span className="font-mono text-[10px] block font-bold">T-{tableNo}</span>
                          <span className="text-[8px] font-sans text-stone-400 block mt-1">
                            {isBooths ? 'Booth' : 'Table'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 block mt-3">
                    * The system will auto-assign the premier spatial location inside your chosen chamber.
                  </span>
                </div>

                {/* Continue CTA */}
                <div className="flex justify-end border-t border-stone-200 pt-8">
                  <button
                    id="reservation-step1-continue"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#1c1917] text-white font-bold text-[10px] tracking-widest uppercase rounded-none hover:bg-gold-600 transition-all cursor-pointer"
                  >
                    <span>Specify Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12 text-[#1c1917]"
              >
                <div className="max-w-xl mx-auto space-y-6">
                  {/* Name */}
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="guest-name-input"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Sire Alexander Thorne"
                      className={`w-full bg-white border rounded-none px-4 py-3 text-xs text-[#1c1917] placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.name}</p>}
                  </div>

                  {/* Mail & Phone Grid */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-2">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        id="guest-email-input"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. alex@mystical.com"
                        className={`w-full bg-white border rounded-none px-4 py-3 text-xs text-[#1c1917] placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-stone-200'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="guest-phone-input"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. +91 94603 51156"
                        className={`w-full bg-white border rounded-none px-4 py-3 text-xs text-[#1c1917] placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-stone-200'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Custom preferences / restrictions / allergies */}
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold block mb-2">
                      Special Sensory Requests & Allergies
                    </label>
                    <textarea
                      id="guest-requests-textarea"
                      value={formRequests}
                      onChange={(e) => setFormRequests(e.target.value)}
                      rows={4}
                      placeholder="e.g. Celebrating our anniversary. Require mild spice levels and zero nuts inside butter dishes..."
                      className="w-full bg-white border border-stone-200 rounded-none px-4 py-3 text-xs text-[#1c1917] placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Policies box */}
                  <div className="p-4 bg-gold-400/5 border border-gold-200 rounded-none text-xs text-gold-950 leading-relaxed font-light">
                    <p className="font-serif italic font-bold mb-1 text-gold-800">Dress Sanctuary Decorum</p>
                    Ensure your companions align with our modern dining aesthetics. We respect a strict dress code: <strong>Smart Sophisticated / Modern ethnic luxury</strong>. No athletic uniforms or caps. Your reserved table is maintained for 15 minutes past scheduled hours.
                  </div>
                </div>

                {/* Back and Confirm buttons */}
                <div className="flex justify-between items-center border-t border-stone-200 pt-8 mt-10">
                  <button
                    onClick={() => setStep(1)}
                    type="button"
                    className="px-6 py-2.5 text-xs font-bold uppercase font-mono text-stone-500 hover:text-[#1c1917] transition-colors cursor-pointer"
                  >
                    Adjust Seating
                  </button>

                  <button
                    id="reservation-submit-cta"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-[#1c1917] text-white font-bold text-[10px] tracking-widest uppercase rounded-none hover:bg-gold-600 transition-all cursor-pointer"
                  >
                    Authorize Reservation
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && completedBooking && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 md:p-12 text-center text-[#1c1917]"
              >
                <div className="inline-flex p-3 rounded-full bg-gold-50 border border-gold-200 text-gold-600 mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h3 className="font-serif text-3xl font-black text-[#1c1917] mb-2">
                  Sanctuary reserved successfully
                </h3>
                <p className="text-stone-600 text-xs font-sans max-w-sm mx-auto mb-8 font-light leading-relaxed">
                  Your reservation is securely documented in our registry. A digital invitation has been dispatched to <strong className="text-gold-600 font-bold">{completedBooking.email}</strong>.
                </p>

                {/* Voucher box */}
                <div className="max-w-md mx-auto bg-white border border-stone-300 p-6 rounded-none text-left mb-10 shadow-sm text-[#1c1917]">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] font-bold">Reference Code</span>
                    <span className="font-mono text-sm text-[#1c1917] font-black tracking-widest">{bookingId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-mono block mb-1">Patron</span>
                      <strong className="text-[#1c1917] font-bold">{completedBooking.customerName}</strong>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-mono block mb-1">Party Size</span>
                      <strong className="text-[#1c1917] font-bold">{completedBooking.guests} Guests</strong>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-mono block mb-1">Date & Hour</span>
                      <strong className="text-[#1c1917] font-bold">{completedBooking.date} • {completedBooking.time}</strong>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-mono block mb-1">Assigned Chamber</span>
                      <strong className="text-[#1c1917] font-bold">
                        {completedBooking.zoneId === 'royal-hall' && 'Royal Heritage Hall'}
                        {completedBooking.zoneId === 'monsoon-garden' && 'Monsoon Sanctuary'}
                      </strong>
                    </div>
                  </div>

                  {completedBooking.specialRequests && (
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <span className="text-stone-400 text-[9px] uppercase font-mono block mb-1 font-bold">Indulgence Directives</span>
                      <p className="text-stone-600 text-[11px] leading-relaxed italic">"{completedBooking.specialRequests}"</p>
                    </div>
                  )}
                </div>

                {/* Cancel or Back */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-stone-200">
                  <button
                    id="cancel-reservation-btn"
                    onClick={resetAll}
                    className="flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Void Reservation / Cancel
                  </button>

                  <button
                    onClick={resetAll}
                    className="px-8 py-3.5 bg-[#1c1917] text-white font-bold text-[10px] tracking-widest uppercase rounded-none shadow-xs hover:bg-gold-600 transition-all cursor-pointer"
                  >
                    Book Secondary Table
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
