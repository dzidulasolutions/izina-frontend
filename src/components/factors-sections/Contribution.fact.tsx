import React from 'react'
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import NewContributionsCard from '../cards/NewContributionsCard';

const Contribution = () => {
        const [showContribution, setShowContribution] = useState(false);
      
  return (
    <>
              <section>
                <AnimatePresence>
                  {showContribution && (
                    <>
                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-primary/40"
                        onClick={() => setShowContribution(false)}
                      />
      
                      {/* Contribution Card */}
                      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35, duration: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed bottom-0 left-0 z-50 w-full bg-background p-4 h-[70%] overflow-y-auto scrollbar-none"
                      >
      
                        {/* 
                        <ContributionsCard
                          contribution={{
                            label: "Afia",
                            description: {
                              fr: "Née un vendredi",
                              en: "Born on Friday",
                            },
                            category: ["traditionnel"],
                            country: ["Togo", "Ghana"],
                            ethnicGroup: ["Éwé"],
                            gender: "féminin",
                          }}
                        /> 
                        */}
                          <NewContributionsCard
                            onClose={() => setShowContribution(false)}
                            onSubmit={(data) => {
                              console.log(data);
                            }}
                          />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </section>
    </>
  )
}

export default Contribution
