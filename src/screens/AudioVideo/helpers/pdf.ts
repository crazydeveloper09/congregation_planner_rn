import { mainTranslations } from "../../../../localization";
import { IMeeting } from "../../../contexts/interfaces";
import useLocaLization from "../../../hooks/useLocalization";
import { attendantTranslations } from "../Attendants/translations";
import { audioVideoTranslations } from "../translations";

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

export function buildAudioVideoPDF(meetings: IMeeting[], month: string) {
    const audioVideoTranslate = useLocaLization(audioVideoTranslations);
    const mainTranslate = useLocaLization(mainTranslations);

  const tableRows = meetings
    .map(
      (meeting) => `
        <tr class="text-center">
                                    <td>${new Date(meeting.date).toLocaleDateString('pl-PL')}</td>
                                        <td>${meeting.audioVideo?.videoOperator?.name}</td>
                                        <td>${meeting.audioVideo?.audioOperator?.name || audioVideoTranslate.t("noAssignmentText")}</td>
                                        <td>${meeting.audioVideo?.microphone1Operator?.name}</td>
                                        <td>${meeting.audioVideo?.microphone2Operator?.name || audioVideoTranslate.t("noAssignmentText")}</td>
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
                <h1 class="text-center" style="font-weight: 700;">Audio-video - ${month}</h1>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="text-center">
                                <th>${mainTranslate.t("dateLabel")}</th>
                                <th>${audioVideoTranslate.t("videoOperatorLabel")}</th>
                                <th>${audioVideoTranslate.t("audioOperatorLabel")}</th>
                                <th>${audioVideoTranslate.t("mic1Label")}</th>
                                <th>${audioVideoTranslate.t("mic2Label")}</th>
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

export function buildAttendantsPDF(meetings: IMeeting[], month: string) {
    const attendantTranslate = useLocaLization(attendantTranslations);
    const audioVideoTranslate = useLocaLization(audioVideoTranslations);
    const mainTranslate = useLocaLization(mainTranslations);

  const tableRows = meetings
    .map(
      (meeting) => `
        <tr class="text-center">
                                    <td>${new Date(meeting.date).toLocaleDateString('pl-PL')}</td>
                                    <td>${meeting.ordinal?.hallway1?.name}</td>
                                    <td>${meeting.ordinal?.hallway2?.name || audioVideoTranslate.t("noAssignmentText")}</td>
                                    <td>${meeting.ordinal?.auditorium?.name}</td>
                                    <td>${meeting.ordinal?.parking?.name || audioVideoTranslate.t("noAssignmentText")}</td>
                                </tr>
                                `
    )
    .join("");

  return `
    <html>
      ${baseHtmlHead}
      <body>
        <div class="container">
            <div class="row" style="margin-top: 5%;">
                <div class="col-lg-12">
                <h1 class="text-center" style="font-weight: 700;">${attendantTranslate.t("sectionText")} - ${month}</h1>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                    <thead>
                         <tr class="text-center">
                                <th>${mainTranslate.t("dateLabel")}</th>
                                <th>${attendantTranslate.t("hallwayLabel")}</th>
                                <th>${attendantTranslate.t("hallway2Label")}</th>
                                <th>${attendantTranslate.t("auditoriumLabel")}</th>
                                <th>${attendantTranslate.t("parkingLabel")}</th>
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

