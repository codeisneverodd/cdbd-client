import styles from "../styles.module.scss";

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import {
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import iconGoogle from "/public/images/icon-google.png";
import iconGoogleBg from "/public/images/icon-google-bg.png";
import iconNaverBg from "/public/images/icon-naver-bg.png";
import iconKakaoBg from "/public/images/icon-kakao-bg.png";
import iconLocation from "/public/images/block-icon-primary-Map.svg";
import BlockDesign from "../components/BlockDesign";
import DesignBoxHead from "../components/DesignBoxHead";
import SectionItemCorner from "../components/SectionItemCorner";
import { SwitchSecondary } from "@/components/buttons/Switches";
import { changeStyle } from "@/redux/features/BlockData/blockDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

export default function Location({title = "위치 안내"}: {title?: string}) {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((state) => state.blockData.present.selectedBlockId);
  const selectedBlockStyle = useAppSelector((state) => state.blockData.present.blocks.find((block) => block.id === selectedBlockId)?.style);

  const [ratio, setRatio] = React.useState("origin");

  const [showAddressText, setShowAddressText] = useState<boolean>(false);
  // const [showMapButton, setShowMapButton] = useState<boolean>(false);

  const handleAddressSwitchToggle = (checked: boolean) => {
    // setState(!state);
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          showAddressText: checked,
        },
      })
    );
  };
  const handleButtonSwitchToggle = (checked: boolean) => {
    // setState(!state);
    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          showMapButton: checked,
        },
      })
    );
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newRatio: string
  ) => {
    if (newRatio !== null) {
      setRatio(newRatio);
    }
  };
  
  const [mapType, setMapType] = useState("google");
  const handleMapTypeChange = (event: SelectChangeEvent) => {
    setMapType(event.target.value as string);
    dispatch(changeStyle({
      id: selectedBlockId,
      style: {
        ...selectedBlockStyle,
        type: event.target.value as string,
      },
    }));
  };

  const [isAddressInputFocus, setIsAddressInputFocus] = useState(false);
  const handleAddressFocus = () => {
    setIsAddressInputFocus(true);
  };
  const handleAddressBlur = () => {
    setIsAddressInputFocus(false);
  };

  const onPlaceChanged = (place: google.maps.places.PlaceResult|null) => {
    if (!place) return;
    console.log('asfasdf',place);

    dispatch(
      changeStyle({
        id: selectedBlockId,
        style: {
          ...selectedBlockStyle,
          address: place.formatted_address,
          lat: place.geometry?.location?.lat().toString(),
          lng: place.geometry?.location?.lng().toString(),
          // zoom: place.geometry?.viewport?.toJSON().zoom.toString(),
        },
      })
    );
  };



  return (
    <div className={styles.designBox}>
      <DesignBoxHead
        title={title}
        icon={<Image src={iconLocation} alt="iconLocation" />}
      />

      <ul className={styles.body}>
        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>주소</div>
            <Stack direction="column" width="100%">
              <Stack
                direction="row"
                gap="8px"
                width="100%"
                mb="2px"
                position="relative"
              >
                {/* <TextField
                  onChange={onPlaceChanged}
                  color="secondary"
                  fullWidth
                  placeholder="주소를 입력하세요."
                  onFocus={handleAddressFocus}
                  onBlur={handleAddressBlur}
                /> */}
                {/* sadfasdfasd */}
                {/* {process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} */}
                <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
                solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
                >
                  <PlaceAutocomplete  onPlaceSelect={onPlaceChanged}/>
                </APIProvider>
                {/* <Select
                  className="indivisible"
                  color="secondary"
                  fullWidth
                  size="small"
                  value={mapType}
                  onChange={handleMapTypeChange}
                  IconComponent={KeyboardArrowDownIcon}
                  renderValue={(selected) =>
                    selected === "google" ? (
                      <Image
                        src={iconGoogleBg}
                        alt="google"
                        width={16}
                        height={16}
                        style={{ transform: "translate(6px, 4px)" }}
                      />
                    ) : selected === "naver" ? (
                      <Image
                        src={iconNaverBg}
                        alt="iconNaverBg"
                        width={16}
                        height={16}
                        style={{ transform: "translate(6px, 4px)" }}
                      />
                    ) : (
                      <Image
                        src={iconKakaoBg}
                        alt="iconKakaoBg"
                        width={16}
                        height={16}
                        style={{ transform: "translate(6px, 4px)" }}
                      />
                    )
                  }
                  sx={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translate(0, -50%)",
                    width: "42px",
                    height: "22px",
                    padding: "0",
                    borderRadius: "4px !important",
                    backgroundColor: isAddressInputFocus ? "var(--color-grey-50)" : "white",
                    "& .MuiSelect-select": {
                      padding: 0,
                      paddingRight: "16px !important",
                      textOverflow: "unset !important",
                    },
                    "& filedset": {
                      padding: 0,
                    },
                    "& .MuiSvgIcon-root": {
                      marginRight: "-4px",
                      marginTop: "1px",
                      width: "16px",
                      height: "16px",
                    },
                  }}
                >
                  <MenuItem value={"google"} style={listButtonStyle}>
                    <Image
                      src={iconGoogleBg}
                      alt="google"
                      width={22}
                      height={22}
                    />
                    <span className="p1">구글맵</span>
                  </MenuItem>
                  <MenuItem value={"naver"} style={listButtonStyle}>
                    <Image
                      src={iconNaverBg}
                      alt="iconNaverBg"
                      width={22}
                      height={22}
                    />
                    <span className="p1">네이버지도</span>
                  </MenuItem>
                  <MenuItem value={"kakao"} style={listButtonStyle}>
                    <Image
                      src={iconKakaoBg}
                      alt="iconKakaoBg"
                      width={22}
                      height={22}
                    />
                    <span className="p1">카카오맵</span>
                  </MenuItem>
                </Select> */}

                {/* <IconButton onClick={handlePopoverOpen} sx={iconButtonStyle}>
                  <Image src={iconGoogle} alt="iconGoogle" />
                </IconButton> */}
              </Stack>
              <Stack direction="row" mt="16px" alignItems="center">
                <FormControlLabel
                  sx={{ marginLeft: 0 }}
                  control={<SwitchSecondary />}
                  value={selectedBlockStyle?.showAddressText}
                  onChange={(e:any) =>
                    handleAddressSwitchToggle(e.target.checked)
                  }
                  label={
                    <span
                      className="caption"
                      style={{
                        marginLeft: "8px",
                        color: showAddressText
                          ? "var(--color-grey-800)"
                          : "var(--color-grey-400)",
                      }}
                    >
                      주소 텍스트
                    </span>
                  }
                />
                <Divider
                  orientation="vertical"
                  sx={{ height: "16px", margin: "0 12px" }}
                />
                <FormControlLabel
                  sx={{ marginLeft: 0 }}
                  control={<SwitchSecondary />}
                  value={selectedBlockStyle?.showMapButton}
                  onChange={(e:any) =>
                    handleButtonSwitchToggle(e.target.checked)
                  }
                  label={
                    <span
                      className="caption"
                      style={{
                        marginLeft: "8px",
                        color: selectedBlockStyle?.showMapButton
                          ? "var(--color-grey-800)"
                          : "var(--color-grey-400)",
                      }}
                    >
                      지도 버튼
                    </span>
                  }
                />
              </Stack>
              <Stack direction="row" mt="16px" alignItems="center">
                <TextField
                  fullWidth
                  label="줌 레벨"
                  type="number"
                  size="small"
                  value={selectedBlockStyle?.zoom}
                  onChange={(e) =>
                    dispatch(
                      changeStyle({
                        id: selectedBlockId,
                        style: {
                          ...selectedBlockStyle,
                          zoom: e.target.value,
                        },
                      })
                    )
                  }
                />
              </Stack>
            </Stack>
          </Stack>
        </li>

        <li className={styles.sectionItem}>
          <Stack direction="row">
            <div className={styles.sectionItemTitle}>비율</div>
            <Stack direction="row" gap="8px" width="100%">
              <ToggleButtonGroup
                value={selectedBlockStyle?.aspectRatio}
                exclusive
                onChange={(_, value)=>{
                  if(!value) return;
                  dispatch(
                    changeStyle({
                      id: selectedBlockId,
                      style: {
                        ...selectedBlockStyle,
                        aspectRatio: value,
                      },
                    })
                  );
                }}
                aria-label="text alignment"
                fullWidth
              >
                <ToggleButton value="1/1" aria-label="1/1">
                  <span
                    className="subtitle2"
                    style={{ color: "var(--color-grey-500)" }}
                  >
                    1:1
                  </span>
                </ToggleButton>
                <ToggleButton value="3/2" aria-label="3/2">
                  <span
                    className="subtitle2"
                    style={{ color: "var(--color-grey-500)" }}
                  >
                    3:2
                  </span>
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>

          <hr className="hr" />
          <SectionItemCorner />
        </li>

        <BlockDesign />
      </ul>

    </div>
  );
}

const listButtonStyle = {
  padding: "8px 12px",
  color: "var(--color-grey-800)",
  gap: "8px",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "var(--color-success-light)",
  },
  "& img": {
    width: 22,
    height: 22,
  },
};

////

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container" style={{width: "100%"}}>
      {/* <input ref={inputRef} />*/}
      <TextField
      // onChange={onPlaceChanged}
      // ref={inputRef}
      inputRef={inputRef}
      color="secondary"
      fullWidth
      placeholder="주소를 입력하세요."
      // onFocus={handleAddressFocus}
      // onBlur={handleAddressBlur}
      />
    </div>
  );
};