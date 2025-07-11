import { Box, Typography } from "@mui/material";
import { colors } from "../../styles/colors";

const NewsBar = () => {
  return (
    <Box
      sx={{
        padding: "0px",
        color: colors.white,
        maxWidth: "400px",
      }}
    >

      <ul style={{ paddingLeft: "1em", margin: 0 }}>
        <li>
          <Typography variant="body2" sx={{ color: colors.white }}>
            <strong>03.07.2025:</strong> Vi flytter snart til Construction City!
          </Typography>
        </li>
        <li>
          <Typography variant="body2" sx={{ color: colors.white }}>
            <strong>20.06.2025:</strong> Ny kontrakt signert for boligprosjekt i Asker.
          </Typography>
        </li>
        <li>
          <Typography variant="body2" sx={{ color: colors.white }}>
            <strong>12.06.2025:</strong> Gratulerer til vårt lærlingeteam for bestått fagprøve!
          </Typography>
        </li>
      </ul>
    </Box>
  );
};

export default NewsBar;