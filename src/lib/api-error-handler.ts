import { AxiosError } from "axios";
import { toast } from "sonner";

export const apiErrorHandler = (err: any) => {
  let errorMsg = "Server Error";
  console.log(err, "<=====err");
  if (err instanceof AxiosError) {
    const data = err.response?.data;

    if ("logout" in data && data["logout"]) {
      if ("teacher" in data && data["teacher"]) {
        // TODO: logout teacher
        // return of(authActions.teacherLogout());
      } else if ("student" in data && data["student"]) {
        // TODO: logout student
        // return of(
        //     authActions.removeUser({
        //         data: null,
        //     }),
        // );
      }
    } else if (typeof data === "object") {
      if ("msg" in data) {
        errorMsg += ` :- ${data["msg"]}`;
      } else if ("error" in data) {
        errorMsg += ` :- ${data["error"]}`;
      } else {
        let errors: Record<string, any> = {};
        for (const [key, value] of Object.entries(data)) {
          if (value) {
            errors[key] = value;
          }
        }

        if (Object.keys(errors).length) {
          let key = Object.keys(errors)[0];
          if (!Array.isArray(errors[key]) && Object.keys(errors[key]).length) {
            let subKey = Object.keys(errors[key])[0];

            errorMsg += ` :- ${
              (errors[key] as any)[subKey][0]
            }(${key}.${subKey})`;
          } else if (errors[key][0]) {
            errorMsg += ` :- ${errors[key][0]}(${key})`;
          }
        }
      }
    } else {
      errorMsg += ":- Something went worng";
    }
  } else {
    errorMsg = `Client Error :- ${err?.message}`;
  }

  toast.error(errorMsg);
};
