import { ToggleButton, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'var(--color-success-pale)',
      color: 'var(--color-grey-700)',
      maxWidth: 180,
      minWidth: 180,
      padding: "16px",
      borderRadius: "8px",
      border: '1px solid var(--color-success-medium)',
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "150%",
      textAlign: "center",
      letterSpacing: "-0.24px",
    },
  }));

  
export default function BlockSelectButton({
    value,
    selected,
    handleChange,
    title,
    tooltipText,
    icon,
  }: {
    value: string;
    selected?:boolean;
    handleChange?: () => void;
    title: string;
    tooltipText: string;
    icon: React.ReactElement;
  }) {
    return (
      <CustomTooltip title={tooltipText} placement="right" arrow disableInteractive>
        <ToggleButton
          value={value}
          aria-label="button"
          selected={selected}
          sx={{
            width: "calc(33.333% - 8px)",
            height: "80px",
            flexDirection: "column",
            gap: "8px",
            color: "var(--color-grey-800)",
          }}
          onChange={handleChange}
        >
          {icon}
          <span className="h5">{title}</span>
        </ToggleButton>
      </CustomTooltip>
    );
  }