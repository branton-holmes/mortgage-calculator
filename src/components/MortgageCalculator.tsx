import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Center,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { calculatePayment } from "../helpers/paymentCalculator";
import { api } from "../services/api";

//Rather than have the options for the savings period drop down predefined, create them functionally (with the future possibility of having more or less options to select from)
const createSavingsPeriodOptions = (maxLength: number) => {
  const array: number[] = Array.from(Array(maxLength).keys());

  return array.map((value) => (
    <option key={value + 1} value={value + 1}>
      {value + 1} months
    </option>
  ));
};

export const MortgageCalculator = () => {
  const [payment, setPayment] = useState("");
  const [federalInterestRate, setFederalInterestRate] = useState(0);
  const onSubmit = async (data) => {
    const result = await api.postMortgageEstimate(data);
    console.log(result);
  };
  const loadFederalInterestRate = async () => {
    const result = await api.getInterestRate();
    setFederalInterestRate(result);
  };
  useEffect(() => {
    loadFederalInterestRate();
  }, []);

  const { register, handleSubmit, watch, trigger, errors } = useForm({
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      mortgageAmount: '',
      paymentPeriod: '',
      interestRate: federalInterestRate,
      monthlySavings: '',
      savingsPeriod: '',
    }
  });

  const watchAllFields = watch();

  useEffect(() => {
    console.log(errors);
    const hasNecessaryValues =
      parseInt(watchAllFields.mortgageAmount) > 0 && parseInt(watchAllFields.paymentPeriod) > 0;
    if (Object.keys(errors).length === 0 && hasNecessaryValues) {
      const newPayment = calculatePayment(watchAllFields);
      setPayment(`$${newPayment}`);
    }
  }, [trigger, watchAllFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontWeight="500" fontSize="32px">
        Welcome to the Tally mortgage calculator!
      </Text>
      <Text maxW={{ sm: "100%", xl: "67%" }} mb="1em">
        Figure out how much mortgage you can afford given your current budget,
        and see how much you can save in the long term by saving towards a
        larger down payment now
      </Text>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={{ sm: 2, md: 6 }}
      >
        <Box mb="2rem">
          <Text mb="8px">Mortgage amount</Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              type="number"
              name="mortgageAmount"
              placeholder="Mortgage amount"
              ref={register({ required: true, min: 1000 })}
            />
          </InputGroup>
          {errors.mortgageAmount && errors.mortgageAmount.type === "required" && (
            <Text color="#cc3300">Mortgage amount is required</Text>
          )}
          {errors.mortgageAmount && errors.mortgageAmount.type === "min" && (
            <Text color="#cc3300">Mortgage amount must be at least $1000</Text>
          )}
        </Box>
      </Grid>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={{ sm: 2, md: 6 }}
      >
        <Box>
          <Text mb="8px">Payment period</Text>
          <Select
            name="paymentPeriod"
            placeholder="Payment period"
            ref={register({ required: true })}
          >
            <option value={10}>10 years</option>
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
            <option value={30}>30 years</option>
            <option value={50}>50 years</option>
          </Select>
          {errors.paymentPeriod && <Text color="#cc3300">{errors.paymentPeriod.message}</Text>}
        </Box>
        <Box>
          <Text mb="8px">Interest Rate</Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="%"
            />
            <Input
              name="interestRate"
              ref={register}
              value={federalInterestRate + 2.5}
              disabled
            />
          </InputGroup>
          {errors.interestRate && <Text color="#cc3300">{errors.interestRate.message}</Text>}
        </Box>
      </Grid>
      <Text mt="2em" mb="1em">
        Enter how much you can save each month for a downpayment, and select an
        amount of time to save for to see the effect on your estimated payment
      </Text>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={{ sm: 2, md: 6 }}
      >
        <Box>
          <Text mb="8px">Monthly Savings</Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              type="number"
              name="monthlySavings"
              placeholder="Monthly savings"
              ref={register({ min: 1 })}
            />
          </InputGroup>
          {errors.monthlySavings && errors.monthlySavings.type === "min" && (
            <Text color="#cc3300">Monthly savings must be greater than 0</Text>
          )}
        </Box>
        <Box>
          <Text mb="8px">Months of saving</Text>
          <Select name="savingsPeriod" placeholder="Months" ref={register}>
            {createSavingsPeriodOptions(60)}
          </Select>
        </Box>
      </Grid>
      <Text mt="2em" fontWeight="500" fontSize="20px">
        {payment.length > 0
          ? `Your mortgage payment would be ${payment} per month`
          : "Enter a mortgage value and select a payment period to see your estimated monthly mortgage payments"}
      </Text>
      <Center>
        <VStack>
          <Box>
            <Text mt="2em" mb=".5em">
              Click submit to save your info
            </Text>
          </Box>
          <Box>
            <Button
              bg="#245085"
              borderColor="#245085"
              height="50px"
              width="335px"
              borderRadius="100px"
              color="white"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </VStack>
      </Center>
    </form>
  );
};
