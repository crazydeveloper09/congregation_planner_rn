import { IMinistryMeeting } from "../../../contexts/interfaces";
import useLocaLization from "../../../hooks/useLocalization";
import { ministryMeetingsTranslations } from "../translations";

const baseHtmlHead = `
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Montserrat', sans-serif;
        margin: 0 15px;
        font-style: normal;
      }
      thead {
        background: #1f8aad;
        color: #fff;
        font-family: 'Poppins', sans-serif;
      }
      tr:nth-of-type(2n) {
        background: rgba(0, 0, 0, 0.05);
      }
    </style>
  </head>
`;

export function buildMinistryMeetingsPDF(meetings: IMinistryMeeting[], month: string) {
    const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations);

  const tableRows = meetings
    .map(
      (meeting) => `
        <tr class="text-center">
          <td>${meeting.defaultPlace !== "Grupy" ? new Date(meeting.date).toLocaleString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }) :  new Date(meeting.date).toLocaleDateString("pl-PL", {
                      day: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                    })}</td>
          <td>${meeting.place || meeting.defaultPlace}</td>
          <td>${meeting.topic || ministryMeetingTranslate.t("leadChooseTopicText")}</td>
          <td>${meeting.lead?.name || ""}</td>
        </tr>`
    )
    .join("");

  return `
    <html>
      ${baseHtmlHead}
      <body>
        <div class="container">
            <div class="row" style="margin-top: 5%;">
                <div class="col-lg-12">
                <h1 class="text-center" style="font-weight: 700;">${ministryMeetingTranslate.t("sectionText")} - ${month}</h1>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="text-center">
                            <th>${ministryMeetingTranslate.t("dateLabel")}</th>
                            <th>${ministryMeetingTranslate.t("placeLabel")}</th>
                            <th>${ministryMeetingTranslate.t("topicLabel")}</th>
                            <th>${ministryMeetingTranslate.t("leadLabel")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
      </body>
    </html>
  `;
}
