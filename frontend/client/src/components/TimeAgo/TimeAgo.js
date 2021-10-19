import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/context";

function TimeAgo({ currentDate, beginDate }) {
  const msInDay = 1000 * 3600 * 24;
  const msInWeek = 1000 * 3600 * 24 * 7;
  const msInMonth = 1000 * 3600 * 24 * 31;
  const msInYear = 1000 * 3600 * 24 * 365;
  const daysAgo = Math.floor((currentDate - beginDate) / msInDay);
  const weeksAgo = Math.floor((currentDate - beginDate) / msInWeek);
  const monthsAgo = Math.floor((currentDate - beginDate) / msInMonth);
  const yearsAgo = Math.floor((currentDate - beginDate) / msInYear);
  const [descriptor, setDescriptor] = useState("");

  useEffect(() => {
    if (daysAgo < 1) {
      return setDescriptor(`Today`);
    } else if (daysAgo > 0 && daysAgo < 2) {
      return setDescriptor(`${daysAgo} Day ago`);
    } else if (daysAgo > 1 && daysAgo < 7) {
      return setDescriptor(`${daysAgo} Days ago`);
    } else if (weeksAgo > 0 && weeksAgo < 2) {
      return setDescriptor(`${weeksAgo} Week ago`);
    } else if (weeksAgo > 1 && weeksAgo < 4) {
      return setDescriptor(`${weeksAgo} Weeks ago`);
    } else if (monthsAgo > 0 && monthsAgo < 2) {
      return setDescriptor(`${monthsAgo} Month ago`);
    } else if (monthsAgo > 1 && monthsAgo < 12) {
      return setDescriptor(`${monthsAgo} Months ago`);
    } else if (yearsAgo > 0 && yearsAgo < 2) {
      return setDescriptor(`${yearsAgo} Year ago`);
    } else if (yearsAgo > 1) {
      return setDescriptor(`${yearsAgo} Years ago`);
    }
  }, [descriptor]);

  return (
    <>
      <span>{descriptor}</span>
    </>
  );
}

export default TimeAgo;
