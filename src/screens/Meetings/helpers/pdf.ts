import { IMeeting } from "../../../contexts/interfaces";
import { groupBy } from "../../../helpers/arrays";
import useLocaLization from "../../../hooks/useLocalization";
import { chooseFontColorAndIcon } from "../Assignments/helpers/types";
import { meetingAssignmentTranslations } from "../Assignments/translations";
import { meetingsTranslations } from "../translations";

const baseHtmlHead = `
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;700&family=Montserrat:wght@100;300;400;700&family=Poppins:wght@100;300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <style>
        * {
            -webkit-font-style: normal;
            font-style: normal;
        }
        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0 15px;
            -webkit-font-style: normal;
            font-style: normal;
        }
        .info {
            margin: 10px 0;
            font-size: 11px;
            font-family: 'Poppins', sans-serif;
        }
        i {
            margin-right: 7px;
        }
        .meetings {
            display: -webkit-box;
            display: -webkit-flex;
            -webkit-flex-wrap: wrap;
            -webkit-justify-content: space-between;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .meeting {
            width: 48%;
            margin-bottom: 60px;
        }
        .assignment {
            padding: 10px 0;
        }
        .assignment_type {
            padding: 6px;
            font-size: 13px;
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            color: white;
        }
        .assignment_topic {
            margin: 10px 0;
            font-size: 11px;
            font-weight: 400;
        }
    </style>
  </head>
`;

export function buildMeetingsPDF(
  meetings: IMeeting[],
  type: string,
  month: string
) {
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const assignmentsTranslate = useLocaLization(meetingAssignmentTranslations);

  const content = meetings
    .map((meeting) => {
      const assignmentsByType = groupBy(meeting.assignments, "type");

      return `
      <div class="meeting" style="margin-bottom: 80px;">
        <h3 style="font-size: 18px;">${new Date(meeting.date).toLocaleString(
          "pl-PL",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        )}</h3>
        <div class="info">${meetingTranslate.t("cleaningLabel")}: <strong>${
        meeting.cleaningGroup?.name || ""
      }</strong></div>
        <div class="info">${meetingTranslate.t("songLabel")}: <strong>${
        meeting.beginSong
      }</strong></div>
        <div class="info">${meetingTranslate.t("leadLabel")}: <strong>${
        meeting.lead?.name || ""
      }</strong></div>
        <div class="info">${meetingTranslate.t("prayerLabel")}: <strong>${
        meeting.beginPrayer?.name || ""
      }</strong></div>
        <div class="assignments">
          ${Object.keys(assignmentsByType)
            .map((type) => {
              const color = chooseFontColorAndIcon(type).fontColor;
              const songs =
                type === assignmentsTranslate.t("watchtowerStudy") ||
                type === assignmentsTranslate.t("livingAsChristians")
                  ? `
              <div class="info">${meetingTranslate.t("songLabel")}: <strong>${
                      meeting.midSong
                    }</strong></div>
            `
                  : "";
              const assignmentItems = assignmentsByType[type]
                .map(
                  (a) => `
              <p class="assignment_topic" style="color: ${color};">${
                    a.topic || a.defaultTopic
                  }</p>
              <div class="info"><strong>${
                a.participant?.name || a.otherParticipant
              }</strong></div>
              ${
                a.reader
                  ? `<div class="info">${assignmentsTranslate.t(
                      "readerLabel"
                    )}: <strong>${a.reader?.name}</strong></div>`
                  : ""
              }
            `
                )
                .join("");
              return `
              <div class="assignment">
                ${songs}
                <div class="assignment_type" style="background: ${color};">${type}</div>
                ${assignmentItems}
              </div>
            `;
            })
            .join("")}
        </div>
        <hr style="height: 1px; background-color: black;">
        <div class="info">${meetingTranslate.t("songLabel")}: <strong>${
        meeting.endSong
      }</strong></div>
        <div class="info">${meetingTranslate.t("endPrayerLabel")}: <strong>${
        meeting.endPrayer?.name || meeting.otherEndPrayer || ""
      }</strong></div>
      </div>
      <hr>
    `;
    })
    .join("");

  return `
    <html>
      ${baseHtmlHead}
      <body>
        <div class="container">
          <h1 class="text-center" style="font-weight: 700;font-size: 20px;">${type} - ${month}</h1>
          <div class="meetings">${content}</div>
        </div>
      </body>
    </html>
  `;
}
