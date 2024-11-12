import styles from "../styles.module.scss";
import React from 'react'
import { Stack, Slider, TextField } from '@mui/material'

export default function SectionItemSpace() {
  return (
        <Stack direction="row">
            <div className={styles.sectionItemTitle}>간격</div>

            <Stack direction="row" alignItems="center" gap="20px" width="100%">
              <Slider
                color="secondary"
                aria-label="padding"
                // defaultValue={selectedBlockStyle.height}
                value={5}
                // onChange={(e, value) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, height: value }}))}
                shiftStep={10}
                step={10}
                marks
                min={0}
                max={5}
              />
              <TextField
                className="indivisible"
                color="secondary"
                placeholder="0"
                // onChange={(e) => dispatch(changeStyle({id: selectedBlockId, style:{ ...selectedBlockStyle, height: Number(e.target.value) }}))}
                value={5}
                sx={{
                  width: "60px",
                  minWidth: "60px",
                  "& .MuiInputBase-root": {
                    padding: 0,
                  },
                }}
              />
            </Stack>
          </Stack>
  )
}
