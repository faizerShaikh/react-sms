import { Heading } from "@/components/heading";
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { api } from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { formatDate } from "date-fns";
import { BACKEND_DATE_FORMAT } from "@/constants";
import { NoData } from "@/components";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Alert } from "@/components/ui/alert";

Chart.register(ChartDataLabels);
Chart.register(CategoryScale);

type Props = {};

export function StudentAttendanceChart({}: Props) {
  const {
    state: { userData },
  } = useAuth();
  const [academicMonth, setAcademicMonth] = useState<string>("");
  const { data: academicMonths } = useQuery({
    queryKey: ["academicMonths"],
    queryFn: () => api.get("/schools/admin/academic-months/"),
    select: (data) =>
      data.data.filter(
        (month: any) =>
          new Date(month.year, month.month - 1, 1) < new Date() &&
          new Date(month.year, month.month - 1, 1) > new Date("2025-01-01")
      ),
  });
  useEffect(() => {
    if (academicMonths?.length) {
      const thisMonth = academicMonths.find((month: any) => month.this_month);
      setAcademicMonth(
        thisMonth
          ? new Date(
              `${thisMonth.year}-${thisMonth.month
                .toString()
                .padStart(2, "0")}-01`
            ).toISOString()
          : ""
      );
    }
  }, [academicMonths]);

  const { data: attendanceData } = useQuery({
    queryKey: ["attendanceData", academicMonth, userData?.student_id],
    queryFn: () =>
      api.get(`app/reports/student-monthly-attendance/`, {
        params: {
          student: userData?.student_id,
          date: formatDate(academicMonth, BACKEND_DATE_FORMAT),
        },
      }),
    select: (data) => data?.data?.data_in_percent || [],
    enabled: !!academicMonth && !!userData?.student_id,
  });

  return (
    <div>
      <Heading>
        <div className='flex justify-between items-center'>
          <span>Attendance Record</span>
          <div>
            <Select value={academicMonth} onValueChange={setAcademicMonth}>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='' />
              </SelectTrigger>
              <SelectContent>
                {academicMonths?.map((month: any) => (
                  <SelectItem
                    key={month.month_name + month.year}
                    value={new Date(
                      `${month.year}-${month.month
                        .toString()
                        .padStart(2, "0")}-01`
                    ).toISOString()}
                  >
                    {month.this_month ? "This Month" : month.month_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Heading>
      <div className='flex justify-center items-center mt-5'>
        {!attendanceData?.length ? (
          <NoData className='h-[400px]'></NoData>
        ) : (
          <div className='flex flex-col gap-5'>
            <div className='h-[400px] w-full flex justify-center items-center'>
              <Pie
                data={{
                  labels: ["Present", "Absent", "Other"],
                  datasets: [
                    {
                      label: "Attendance",
                      data: attendanceData,
                      backgroundColor: ["#5C92FF", "#FA782E", "#E4EDFF"],
                      borderRadius: 10,
                    },
                  ],
                }}
                options={{
                  offset: 10,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                    title: {
                      display: false,
                    },
                    datalabels: {
                      color: function (context: any) {
                        var index = context.dataIndex;
                        return index === 2 ? "#5C92FF" : "#ffffff";
                      },
                      formatter: (value) => {
                        // Show both label and value
                        return value ? `${value}%` : "";
                      },
                      align: "start",
                      anchor: "end",
                      font: {
                        weight: "bold",
                        size: 14,
                      },
                    },
                  },
                }}
              />
            </div>
            <Alert variant='info' className='block'>
              <span className='font-semibold'>"Other"</span> labelled data
              includes public holidays and days when attendance was not
              recorded.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
