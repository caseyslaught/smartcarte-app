import { useEffect, useState } from "react";

import { PublicAPI } from "../../../api";

interface Props {
  taskUid: string | undefined;
}

const useTask = ({ taskUid }: Props) => {
  const [task, setTask] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await PublicAPI.get(
          "tasks/get_demo_classification_task/" + taskUid
        );

        if (res.status === 200) {
          setTask(res.data);
        }
      } catch (error) {
        console.log(error);
        setTask(null);
      } finally {
        setComplete(true);
      }
    };

    if (taskUid) {
      fetchTask();
    } else {
      setTask(null);
    }
  }, [taskUid]);

  return [task, complete];
};

export default useTask;
