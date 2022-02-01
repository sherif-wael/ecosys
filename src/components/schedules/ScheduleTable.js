import { ViewSchedule, DeleteSchedule } from "./ScheduleActions";
import Table from "components/lib/Table";
import {
    getTimeStringFromSeconds,
    getTimeFromDateString,
    convertTimeToAmPmFormat
} from "utils/dateConverter";
import { useTranslation } from "react-i18next";
 
function SchedulesTable({ schedules }){
    const { t } = useTranslation();
    const tableHead = [t("scheduleType"), t("timeFrom"), t("duration"), t("actions")];
    
    return (
        <Table list={schedules} tableHead={tableHead}>
            {
                slicedSchedules => slicedSchedules.map(schedule => (
                    <tr key={schedule.id}>
                        <td>{schedule.schedule_type}</td>
                        <td>{convertTimeToAmPmFormat(getTimeFromDateString(schedule.time_from))}</td>
                        <td>{getTimeStringFromSeconds(schedule.duration)}</td>
                        <td className="actions">
                            <ViewSchedule to={`/admin/schedules/${schedule.id}`} />
                            <DeleteSchedule schedule={schedule} />
                        </td>
                    </tr>
                ))
            }
        </Table>
    )
}

export default SchedulesTable;