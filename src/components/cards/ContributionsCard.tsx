import { Contribution } from "@/src/lib/types/contribution";
import { IconlyArrowRight, IconlyLocation, IconlyUser,} from "../ui/icons";

type ContributionsCardProps = {
      contribution: Contribution;
};

const ContributionsCard = ({
      contribution,
}: ContributionsCardProps) => {
      return (
            <article className="w-full border border-primary bg-background p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                        <div>
                              <h3 className="font-righteous text-2xl text-primary">
                                    {contribution.label}
                              </h3>

                              <p className="mt-1 font-ui text-sm text-primary/60">
                                    {contribution.description.fr}
                              </p>
                        </div>

                        <span className="border border-primary px-2 py-1 font-ui text-[10px] uppercase">
                              {contribution.gender}
                        </span>
                  </div>

                  {/* Informations */}
                  <div className="mt-5 space-y-3">
                        {/* Pays */}
                        <div className="flex items-start gap-3">
                              <span className="mt-0.5 shrink-0">
                                    <IconlyLocation size={17} color="currentColor"/>
                              </span>

                              <div className="flex flex-wrap gap-2">
                                    {contribution.country.map((country) => (
                                          <span
                                                key={country}
                                                className="bg-primary px-2 py-1 font-ui text-xs text-background"
                                          >
                                                {country}
                                          </span>
                                    ))}
                              </div>
                        </div>

                        {/* Ethnie */}
                        <div className="flex items-start gap-3">
                              <span className="mt-0.5 shrink-0">
                                    <IconlyUser
                                          size={17}
                                          color="currentColor"
                                    />
                              </span>

                              <div className="flex flex-wrap gap-2">
                                    {contribution.ethnicGroup.map((group) => (
                                          <span
                                                key={group}
                                                className="border border-primary px-2 py-1 font-ui text-xs"
                                          >
                                                {group}
                                          </span>
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-primary/20 pt-3">
                        <div className="flex flex-wrap gap-2">
                              {contribution.category.map((category) => (
                                    <span
                                          key={category}
                                          className="font-ui text-xs uppercase tracking-wide text-primary/60"
                                    >
                                          #{category}
                                    </span>
                              ))}
                        </div>

                        <button
                              type="button"
                              className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-background"
                              aria-label={`Voir ${contribution.label}`}
                        >
                              <IconlyArrowRight
                                    size={18}
                                    color="currentColor"
                              />
                        </button>
                  </div>
            </article>
      );
};

export default ContributionsCard;