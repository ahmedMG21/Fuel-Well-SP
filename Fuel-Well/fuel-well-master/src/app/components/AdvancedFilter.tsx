import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSliderValues } from '../store/advancedFilterInputSlice';
import { selectSliderValues } from '../store/advancedFilterInputSlice';
import { RootState } from '../store/store';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function AdvancedFilter(props: any) {
  const [proteinValues, setProteinValues] = React.useState<number[]>([0, 100]);
  const [carbsValues, setCarbsValues] = React.useState<number[]>([0, 999]);
  const [caloriesValues, setCaloriesValues] = React.useState<number[]>([0, 999]);
  const [totalFatValues, setTotalFatValues] = React.useState<number[]>([0, 70]);
  const [saturatedFatValues, setSaturatedFatValues] = React.useState<number[]>([0, 100]);
  const [servingSizeValues, setServingSizeValues] = React.useState<number[]>([0, 500]);
  const [totalSugarValues, setTotalSugarValues] = React.useState<number[]>([0, 100]);
  const [sodiumValues, setSodiumValues] = React.useState<number[]>([0, 1500]);
  const [cholesterolValues, setCholesterolValues] = React.useState<number[]>([0, 200]);
  const [dietaryFiberValues, setDietaryFiberValues] = React.useState<number[]>([0, 100]);
  const [addedSugarValues, setAddedSugarValues] = React.useState<number[]>([0, 100]);

  const sliderValues = useSelector((state: RootState) => selectSliderValues(state));
  const dispatch = useDispatch();

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClick = () => {
    dispatch(setSliderValues({
      'Protien': proteinValues,
      'Total Carbs': carbsValues,
      'Calories': caloriesValues,
      'Total Fat': totalFatValues,
      'Saturated Fat': saturatedFatValues,
      'Serving Size': servingSizeValues,
      'Total Sugar': totalSugarValues,
      'Sodium': sodiumValues,
      'Cholesterol': cholesterolValues,
      'Dietary Fiber': dietaryFiberValues,
      'Added Sugar': addedSugarValues
    }));
    props.handleClose();
  }

  React.useEffect(() => {
    const sliderValuesTyped = sliderValues as {
      'Protien': number[],
      'Total Carbs': number[],
      'Calories': number[],
      'Total Fat': number[],
      'Saturated Fat': number[],
      'Serving Size': number[],
      'Total Sugar': number[],
      'Sodium': number[],
      'Cholesterol': number[],
      'Dietary Fiber': number[],
      'Added Sugar': number[]
    };
    setProteinValues(sliderValuesTyped['Protien'] || [0, 100]);
    setCarbsValues(sliderValuesTyped['Total Carbs'] || [0, 999]);
    setCaloriesValues(sliderValuesTyped['Calories'] || [0, 999]);
    setTotalFatValues(sliderValuesTyped['Total Fat'] || [0, 70]);
    setSaturatedFatValues(sliderValuesTyped['Saturated Fat'] || [0, 100]);
    setServingSizeValues(sliderValuesTyped['Serving Size'] || [0, 500]);
    setTotalSugarValues(sliderValuesTyped['Total Sugar'] || [0, 100]);
    setSodiumValues(sliderValuesTyped['Sodium'] || [0, 1500]);
    setCholesterolValues(sliderValuesTyped['Cholesterol'] || [0, 200]);
    setDietaryFiberValues(sliderValuesTyped['Dietary Fiber'] || [0, 100]);
    setAddedSugarValues(sliderValuesTyped['Added Sugar'] || [0, 100]);


    console.log(proteinValues, carbsValues, caloriesValues, totalFatValues, saturatedFatValues, servingSizeValues, totalSugarValues, sodiumValues, cholesterolValues, dietaryFiberValues, addedSugarValues);

  }, [sliderValues]);

  const handleReset = () => {
    setProteinValues([0, 100]);
    setCarbsValues([0, 999]);
    setCaloriesValues([0, 999]);
    setTotalFatValues([0, 70]);
    setSaturatedFatValues([0, 100]);
    setServingSizeValues([0, 500]);
    setTotalSugarValues([0, 100]);
    setSodiumValues([0, 1500]);
    setCholesterolValues([0, 200]);
    setDietaryFiberValues([0, 100]);
    setAddedSugarValues([0, 100]);

    dispatch(setSliderValues({
      'Protien': [0, 100],
      'Total Carbs': [0, 999],
      'Calories': [0, 999],
      'Total Fat': [0, 70],
      'Saturated Fat': [0, 100],
      'Serving Size': [0, 500],
      'Total Sugar': [0, 100],
      'Sodium': [0, 1500],
      'Cholesterol': [0, 200],
      'Dietary Fiber': [0, 100],
      'Added Sugar': [0, 100]
    }));


  }
  const sliderValuesTyped: { label: string, values: number[], setValues: React.Dispatch<React.SetStateAction<number[]>>, max: number }[] =  [
    { label: 'Protein', values: proteinValues, setValues: setProteinValues, max: 100 },
    { label: 'Carbs', values: carbsValues, setValues: setCarbsValues, max: 999 },
    { label: 'Calories', values: caloriesValues, setValues: setCaloriesValues, max: 999 },
    { label: 'Total Fat', values: totalFatValues, setValues: setTotalFatValues, max: 70 },
    { label: 'Saturated Fat', values: saturatedFatValues, setValues: setSaturatedFatValues, max: 100 },
    { label: 'Serving Size', values: servingSizeValues, setValues: setServingSizeValues, max: 500 },
    { label: 'Total Sugar', values: totalSugarValues, setValues: setTotalSugarValues, max: 100 },
    { label: 'Sodium', values: sodiumValues, setValues: setSodiumValues, max: 1500 },
    { label: 'Cholesterol', values: cholesterolValues, setValues: setCholesterolValues, max: 200 },
    { label: 'Dietary Fiber', values: dietaryFiberValues, setValues: setDietaryFiberValues, max: 100 },
    { label: 'Added Sugar', values: addedSugarValues, setValues: setAddedSugarValues, max: 100 },
  ];
  return (
    <Box sx={{
      width: '90%',
      maxWidth: 700,
      height: 'auto',
      padding: 2,
      border: '1px solid black',
      borderRadius: 2,
      margin: 'auto',
      backgroundColor: 'lightgrey',
    }}>
      <Typography variant="h6" gutterBottom sx={{
        textAlign: 'center',
        padding: 1,
        margin: 1,
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        Advanced Filter
      </Typography>
      <Typography sx={{ borderBottom: 1, marginBottom: '10px' }}></Typography>

      {/* تكرار نفس التصميم لكل المكونات */}
      {sliderValuesTyped.map(({ label, values, setValues, max }) => (
        <Box display="flex" justifyContent='space-between' alignItems="center" gap={5} marginY={1} key={label}>
          <Typography sx={{ width: 120, fontWeight: 'bold', fontSize: '0.875rem' }}>{label}</Typography>
          <Slider
            sx={{ width: "50%" }}
            getAriaLabel={() => `${label} range`}
            value={values}
            onChange={(event, newValue) => {
              if (!Array.isArray(newValue)) {
                newValue = [newValue, newValue];
              }
              setValues(newValue);
            }}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={max}
          />
          <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
            <TextField
              sx={{ width: 60 }}
              size="small"
              type="number"
              value={values[0]}
              onChange={(e) => setValues([Number(e.target.value), values[1]])}
            />
            <Typography>-</Typography>
            <TextField
              sx={{ width: 60 }}
              size="small"
              type="number"
              value={values[1]}
              onChange={(e) => setValues([values[0], Number(e.target.value)])}
            />
          </Box>
        </Box>
      ))}

      <Typography sx={{ borderTop: 1, marginTop: '10px' }}></Typography>

      <Box sx={{
        display: 'flex', justifyContent: 'space-evenly', alignContent: 'center', marginTop: '20px', marginBottom: '10px'
      }}>
        <Button
          onClick={handleClick}
          variant='contained'
          sx={{
            backgroundColor: '#04AA6D',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.875rem'
          }}
        >Apply Filter</Button>

        <Button
          onClick={handleReset}
          variant='contained'
          sx={{
            backgroundColor: '#f44336',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.875rem'
          }}
        >Reset Filter</Button>
      </Box>
    </Box>
  );
}












// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import { Button, useMediaQuery } from '@mui/material'; // استيراد useMediaQuery
// import { useDispatch, useSelector } from 'react-redux';
// import { setSliderValues } from '../store/advancedFilterInputSlice';
// import { selectSliderValues } from '../store/advancedFilterInputSlice';
// import { RootState } from '../store/store';

// function valuetext(value: number) {
//   return `${value}°C`;
// }

// export default function AdvancedFilter(props: any) {
//   const [proteinValues, setProteinValues] = React.useState<number[]>([0, 100]);
//   const [carbsValues, setCarbsValues] = React.useState<number[]>([0, 999]);
//   const [caloriesValues, setCaloriesValues] = React.useState<number[]>([0, 999]);
//   const [totalFatValues, setTotalFatValues] = React.useState<number[]>([0, 70]);
//   const [saturatedFatValues, setSaturatedFatValues] = React.useState<number[]>([0, 100]);
//   const [servingSizeValues, setServingSizeValues] = React.useState<number[]>([0, 500]);
//   const [totalSugarValues, setTotalSugarValues] = React.useState<number[]>([0, 100]);
//   const [sodiumValues, setSodiumValues] = React.useState<number[]>([0, 1500]);
//   const [cholesterolValues, setCholesterolValues] = React.useState<number[]>([0, 200]);
//   const [dietaryFiberValues, setDietaryFiberValues] = React.useState<number[]>([0, 100]);
//   const [addedSugarValues, setAddedSugarValues] = React.useState<number[]>([0, 100]);

//   const sliderValues = useSelector((state: RootState) => selectSliderValues(state));
//   const dispatch = useDispatch();

//   const isMobile = useMediaQuery('(max-width:600px)'); // استخدام useMediaQuery للتحقق من حجم الشاشة

//   const handleClick = () => {
//     dispatch(setSliderValues({
//       'Protien': proteinValues,
//       'Total Carbs': carbsValues,
//       'Calories': caloriesValues,
//       'Total Fat': totalFatValues,
//       'Saturated Fat': saturatedFatValues,
//       'Serving Size': servingSizeValues,
//       'Total Sugar': totalSugarValues,
//       'Sodium': sodiumValues,
//       'Cholesterol': cholesterolValues,
//       'Dietary Fiber': dietaryFiberValues,
//       'Added Sugar': addedSugarValues
//     }));
//     props.handleClose();
//   }

//   React.useEffect(() => {
//     const sliderValuesTyped = sliderValues as {
//       'Protien': number[],
//       'Total Carbs': number[],
//       'Calories': number[],
//       'Total Fat': number[],
//       'Saturated Fat': number[],
//       'Serving Size': number[],
//       'Total Sugar': number[],
//       'Sodium': number[],
//       'Cholesterol': number[],
//       'Dietary Fiber': number[],
//       'Added Sugar': number[]
//     };
//     setProteinValues(sliderValuesTyped['Protien'] || [0, 100]);
//     setCarbsValues(sliderValuesTyped['Total Carbs'] || [0, 999]);
//     setCaloriesValues(sliderValuesTyped['Calories'] || [0, 999]);
//     setTotalFatValues(sliderValuesTyped['Total Fat'] || [0, 70]);
//     setSaturatedFatValues(sliderValuesTyped['Saturated Fat'] || [0, 100]);
//     setServingSizeValues(sliderValuesTyped['Serving Size'] || [0, 500]);
//     setTotalSugarValues(sliderValuesTyped['Total Sugar'] || [0, 100]);
//     setSodiumValues(sliderValuesTyped['Sodium'] || [0, 1500]);
//     setCholesterolValues(sliderValuesTyped['Cholesterol'] || [0, 200]);
//     setDietaryFiberValues(sliderValuesTyped['Dietary Fiber'] || [0, 100]);
//     setAddedSugarValues(sliderValuesTyped['Added Sugar'] || [0, 100]);
//   }, [sliderValues]);

//   const handleReset = () => {
//     setProteinValues([0, 100]);
//     setCarbsValues([0, 999]);
//     setCaloriesValues([0, 999]);
//     setTotalFatValues([0, 70]);
//     setSaturatedFatValues([0, 100]);
//     setServingSizeValues([0, 500]);
//     setTotalSugarValues([0, 100]);
//     setSodiumValues([0, 1500]);
//     setCholesterolValues([0, 200]);
//     setDietaryFiberValues([0, 100]);
//     setAddedSugarValues([0, 100]);

//     dispatch(setSliderValues({
//       'Protien': [0, 100],
//       'Total Carbs': [0, 999],
//       'Calories': [0, 999],
//       'Total Fat': [0, 70],
//       'Saturated Fat': [0, 100],
//       'Serving Size': [0, 500],
//       'Total Sugar': [0, 100],
//       'Sodium': [0, 1500],
//       'Cholesterol': [0, 200],
//       'Dietary Fiber': [0, 100],
//       'Added Sugar': [0, 100]
//     }));
//   }

//   return (
//     <Box sx={{
//       width: '90%', // تغيير العرض إلى 90%
//       maxWidth: 700,
//       height: 'auto',
//       padding: 2,
//       border: '1px solid black',
//       borderRadius: 2,
//       margin: 'auto',
//       backgroundColor: 'lightgrey',
//     }}>
//       <Typography variant="h6" gutterBottom sx={{
//         textAlign: 'center',
//         padding: 1,
//         margin: 1,
//         fontWeight: 'bold',
//         fontSize: '1.25rem' // تقليل حجم الخط
//       }}>
//         Advanced Filter
//       </Typography>
//       <Typography sx={{borderBottom: 1 , marginBottom:'10px'}}></Typography>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Protein</Typography> {/* تقليل حجم الخط */}
//         <Slider
//           sx={{ width: '60%' }} // تغيير العرض إلى نسبة مئوية
//           getAriaLabel={() => 'Protein range'}
//           value={proteinValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setProteinValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={100}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }} // تغيير العرض
//             size="small"
//             type="number"
//             value={proteinValues[0]}
//             onChange={(e) => setProteinValues([Number(e.target.value), proteinValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }} // تغيير العرض
//             size="small"
//             type="number"
//             value={proteinValues[1]}
//             onChange={(e) => setProteinValues([proteinValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       {/* تكرار نفس التعديلات لباقي العناصر */}
//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Carbs</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Carbs range'}
//           value={carbsValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setCarbsValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={100}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={carbsValues[0]}
//             onChange={(e) => setCarbsValues([Number(e.target.value), carbsValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={carbsValues[1]}
//             onChange={(e) => setCarbsValues([carbsValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Calories</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Calories range'}
//           value={caloriesValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setCaloriesValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={800}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={caloriesValues[0]}
//             onChange={(e) => setCaloriesValues([Number(e.target.value), caloriesValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={caloriesValues[1]}
//             onChange={(e) => setCaloriesValues([caloriesValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Total Fat</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Total Fat range'}
//           value={totalFatValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setTotalFatValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={70}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={totalFatValues[0]}
//             onChange={(e) => setTotalFatValues([Number(e.target.value), totalFatValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={totalFatValues[1]}
//             onChange={(e) => setTotalFatValues([totalFatValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Saturated Fat</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Saturated Fat range'}
//           value={saturatedFatValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setSaturatedFatValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={50}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={saturatedFatValues[0]}
//             onChange={(e) => setSaturatedFatValues([Number(e.target.value), saturatedFatValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={saturatedFatValues[1]}
//             onChange={(e) => setSaturatedFatValues([saturatedFatValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Serving Size</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Serving Size range'}
//           value={servingSizeValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setServingSizeValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={500}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={servingSizeValues[0]}
//             onChange={(e) => setServingSizeValues([Number(e.target.value), servingSizeValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={servingSizeValues[1]}
//             onChange={(e) => setServingSizeValues([servingSizeValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Total Sugar</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Total Sugar range'}
//           value={totalSugarValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setTotalSugarValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={100}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={totalSugarValues[0]}
//             onChange={(e) => setTotalSugarValues([Number(e.target.value), totalSugarValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={totalSugarValues[1]}
//             onChange={(e) => setTotalSugarValues([totalSugarValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Sodium</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Sodium range'}
//           value={sodiumValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setSodiumValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={1000}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={sodiumValues[0]}
//             onChange={(e) => setSodiumValues([Number(e.target.value), sodiumValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={sodiumValues[1]}
//             onChange={(e) => setSodiumValues([sodiumValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Cholesterol</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Cholesterol range'}
//           value={cholesterolValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setCholesterolValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={100}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={cholesterolValues[0]}
//             onChange={(e) => setCholesterolValues([Number(e.target.value), cholesterolValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={cholesterolValues[1]}
//             onChange={(e) => setCholesterolValues([cholesterolValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Dietary Fiber</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Dietary Fiber range'}
//           value={dietaryFiberValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setDietaryFiberValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={100}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={dietaryFiberValues[0]}
//             onChange={(e) => setDietaryFiberValues([Number(e.target.value), dietaryFiberValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={dietaryFiberValues[1]}
//             onChange={(e) => setDietaryFiberValues([dietaryFiberValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Box display="flex" justifyContent='space-between' alignItems="center" gap={2} marginY={1}>
//         <Typography sx={{ width: 100, fontWeight: 'bold', fontSize: '0.875rem' }}>Added Sugar</Typography>
//         <Slider
//           sx={{ width: '60%' }}
//           getAriaLabel={() => 'Added Sugar range'}
//           value={addedSugarValues}
//           onChange={(event, newValue) => {
//             if (!Array.isArray(newValue)) {
//               newValue = [newValue, newValue];
//             }
//             setAddedSugarValues(newValue);
//           }}
//           valueLabelDisplay="auto"
//           getAriaValueText={valuetext}
//           min={0}
//           max={100}
//         />
//         <Box display="flex" justifyContent='space-between' alignItems="center" gap={1}>
//           <TextField
//             sx={{ width: 40 }}
//             size="small"
//             type="number"
//             value={addedSugarValues[0]}
//             onChange={(e) => setAddedSugarValues([Number(e.target.value), addedSugarValues[1]])}
//           />
//           <Typography>-</Typography>
//           <TextField
//             sx={{ width: 60 }}
//             size="small"
//             type="number"
//             value={addedSugarValues[1]}
//             onChange={(e) => setAddedSugarValues([addedSugarValues[0], Number(e.target.value)])}
//           />
//         </Box>
//       </Box>

//       <Typography sx={{borderTop: 1 , marginTop:'10px'}}></Typography>

//       <Box sx={{
//         display: 'flex', justifyContent: 'space-evenly', alignContent: 'center', marginTop: '20px', marginBottom: '10px'
//       }}>
//         <Button
//           onClick={handleClick}
//           variant='contained'
//           sx={{
//             backgroundColor: '#04AA6D',
//             color: 'white',
//             fontWeight: 'bold',
//             fontSize: '0.875rem' // تقليل حجم الخط
//           }}
//         >Apply Filter</Button>

//         <Button
//           onClick={handleReset}
//           variant='contained'
//           sx={{
//             backgroundColor: '#f44336',
//             color: 'white',
//             fontWeight: 'bold',
//             fontSize: '0.875rem' // تقليل حجم الخط
//           }}
//         >Reset Filter</Button>
//       </Box>
//     </Box>
//   );
// }
