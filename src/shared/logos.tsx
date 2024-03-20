import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";

export const getArrowLogo: (classes: string) => ReactElement = (
  classes: string
) => {
  return <ArrowLongRightIcon className={classes} />;
};
