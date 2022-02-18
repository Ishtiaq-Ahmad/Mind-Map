import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@mui/material/Divider";
import MultiTabContext from "../Context/multiTab/MultiTabContext";
import Switch from "@mui/material/Switch";

const PrintLegends = () => {
  const multiNodeName = useContext(MultiTabContext);
  const {
    data: {
      showModalName,
      showTabName,
      showDate,
      showPeriod,
      showUser,
      showSoftwareOwner,
      showSoftwareDeveloper,
    },
    showModalNameHandler,
    showTabNameHandler,
    showDateHandler,
    showPeriodHandler,
    showUserHandler,
    showSoftwareOwnerHandler,
    showSoftwareDevHandler,
  } = multiNodeName;
  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        style={{ textAlign: "center" }}
      >
        Select Legends
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          Show Modal Name:
        </Typography>
        <Switch
          size="small"
          checked={showModalName}
          onChange={(evt) => showModalNameHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          Tab Name:
        </Typography>
        <Switch
          size="small"
          checked={showTabName}
          onChange={(evt) => showTabNameHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          Date:
        </Typography>
        <Switch
          size="small"
          checked={showDate}
          onChange={(evt) => showDateHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          Period:
        </Typography>
        <Switch
          size="small"
          checked={showPeriod}
          onChange={(evt) => showPeriodHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          User:
        </Typography>
        <Switch
          size="small"
          checked={showUser}
          onChange={(evt) => showUserHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          Software Owner:
        </Typography>
        <Switch
          size="small"
          checked={showSoftwareOwner}
          onChange={(evt) => showSoftwareOwnerHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="body1" component="h2">
          Software Developer:
        </Typography>
        <Switch
          size="small"
          checked={showSoftwareDeveloper}
          onChange={(evt) => showSoftwareDevHandler(evt.target.checked)}
          color="primary"
          // name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </div>
  );
};

export default PrintLegends;
