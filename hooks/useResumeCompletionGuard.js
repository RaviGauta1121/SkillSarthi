'use client'
import { useSelector } from "react-redux";
import { selectResume } from "../redux/selectors/resumeSelectors";
import { useEffect } from "react";
import { isObjectEmpty } from "../lib/helper";
import { useRouter, usePathname} from "next/navigation";

const useResumeCompletionGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const resumeData = useSelector(selectResume);

  useEffect(() => {
    const routeOrder = [
      "/resume/contact",
      "/resume/education",
      "/resume/workhistory",
      "/resume/skill",
      "/resume/summary",
      "/resume/extra"
    ];

    const currentIndex = routeOrder.findIndex((route) =>
      pathname.includes(route)
    );

    if (currentIndex === -1 || currentIndex === 0) {
      return;
    }

    const previousRoute = routeOrder[currentIndex - 1];
    const previousData = getResumeDataForRoute(previousRoute);

    if (isObjectEmpty(previousData)) {
      router.push(previousRoute + "/add");
    }
  }, [pathname, resumeData, router]);

  const getResumeDataForRoute = (route) => {
    const propertyName = route.split("/").pop();
    return resumeData[propertyName + "Info"];
  };
};

export default useResumeCompletionGuard;