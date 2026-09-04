"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LINKS } from "@/src/lib/links";

const Navbar = () => {
      const pathname = usePathname();

      const navigation = LINKS[0].navigation;

      return (
            <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
                  <div className="flex h-14 items-center justify-center gap-2 bg-black p-2 shadow-lg">

                        {navigation.map((link: { name: string; href: string; icon: React.ComponentType<{ size?: number; color?: string }> }) => {
                              const Icon = link.icon;

                              const isActive =
                                    pathname === link.href ||
                                    pathname.startsWith(`${link.href}/`);

                              return (
                                    <Link
                                          key={link.href}
                                          href={link.href}
                                          aria-label={link.name}
                                          className="relative flex h-10 w-10 items-center justify-center"
                                    >
                                          {isActive && (
                                                <motion.span
                                                      layoutId="navbar-active"
                                                      className="absolute inset-0 bg-white"
                                                      transition={{
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 30,
                                                      }}
                                                />
                                          )}

                                          <motion.span
                                                className={`relative z-10 flex h-full w-full items-center justify-center ${isActive ? "text-black" : "text-white"
                                                      }`}
                                                animate={{
                                                      scale: isActive ? 1 : 0.9,
                                                }}
                                                transition={{
                                                      type: "spring",
                                                      stiffness: 400,
                                                      damping: 25,
                                                }}
                                          >
                                                <Icon size={19} color="currentColor" />
                                          </motion.span>
                                    </Link>
                              );
                        })}

                  </div>
            </nav>
      );
};

export default Navbar;