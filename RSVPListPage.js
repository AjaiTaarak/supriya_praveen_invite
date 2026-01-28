import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { FaUsers, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

const RSVPListPage = () => {
  const [rsvpData, setRsvpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRSVPData();
  }, []);

  const fetchRSVPData = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "rsvp"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date()
      }));
      setRsvpData(data);
    } catch (err) {
      console.error("Error fetching RSVP data:", err);
      setError("Failed to load RSVP data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const totalGuests = rsvpData.reduce((sum, rsvp) => sum + (rsvp.numberofguests || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fdf8f2' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RSVP data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fdf8f2' }}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchRSVPData}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf8f2' }}>
      <div className="w-full max-w-[420px] mx-auto min-h-screen shadow-xl flex flex-col" style={{ backgroundColor: '#fdf8f2' }}>
        {/* Header */}
        <motion.header 
          className="bg-gradient-to-br from-pink-400 to-pink-600 text-white p-6 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10">
            <button 
              onClick={() => window.history.back()}
              className="absolute left-4 top-6 text-white hover:text-pink-200 transition-colors"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold mb-2">RSVP Responses</h1>
            <p className="text-pink-100">Guest List & Details</p>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-pink-600 mb-1">{rsvpData.length}</div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-pink-600 mb-1">{totalGuests}</div>
              <div className="text-sm text-gray-600">Total Guests</div>
            </div>
          </div>
        </motion.div>

        {/* RSVP List */}
        <motion.div 
          className="flex-1 px-6 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {rsvpData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaUsers size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600">No RSVP responses yet</p>
              <p className="text-sm text-gray-500 mt-2">Check back later for guest responses</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rsvpData.map((rsvp, index) => (
                <motion.div
                  key={rsvp.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{rsvp.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <FaUsers className="text-pink-500" />
                        <span>{rsvp.numberofguests} guest{rsvp.numberofguests > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaCalendarAlt className="text-pink-400" />
                    <span>{formatDate(rsvp.timestamp)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="bg-gray-50 p-4 text-center border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-IN')}
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default RSVPListPage;
