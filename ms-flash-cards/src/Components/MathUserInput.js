import { TopRowOption } from "./TopRowOption";
import { valueRanges } from "../App";

export function MathUserInput({
  testType,
  setTestType,
  questionsPerSession,
  setQuestionsPerSession,
  flashLimit,
  setFlashLimit,
  operator,
  setOperator,
  multiType,
  setMultiType,
  timesTable,
  setTimesTable,
  timesTableRange,
  setTimesTableRange,
  minRange,
  setMinRange,
  maxRange,
  setMaxRange,
}) {
  return (
    <>
      <TopRowOption label="Testing" value={testType} setState={setTestType}>
        {valueRanges.testType.map((type, key) => (
          <option key={key} value={type.value}>
            {type.display}
          </option>
        ))}
      </TopRowOption>
      <TopRowOption
        label="Questions"
        value={questionsPerSession}
        setState={setQuestionsPerSession}
      >
        {Array.from({ length: valueRanges.questionLimit }, (_, i) => i + 1).map(
          (num) => (
            <option key={num} value={num}>
              {num}
            </option>
          )
        )}
      </TopRowOption>

      {/* How many flash cards per question */}
      {testType === "practice" && (
        <TopRowOption
          label="Flashes"
          value={flashLimit}
          setState={setFlashLimit}
        >
          {Array.from({ length: valueRanges.flashLimit }, (_, i) => i + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </TopRowOption>
      )}

      <TopRowOption label="Operator" value={operator} setState={setOperator}>
        {valueRanges.operators.map((type, key) => (
          <option key={key} value={type.value}>
            {type.display}
          </option>
        ))}
      </TopRowOption>

      {operator === "*" || operator === "/" ? (
        <>
          <TopRowOption label="Type" value={multiType} setState={setMultiType}>
            {valueRanges.multiType.map((type, key) => (
              <option key={key} value={type.value}>
                {type.display}
              </option>
            ))}
          </TopRowOption>

          {multiType === "individual" && (
            <TopRowOption
              label="Times Table"
              value={timesTable}
              setState={setTimesTable}
            >
              {Array.from({ length: valueRanges.range }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              )}
            </TopRowOption>
          )}

          <TopRowOption
            label="Range"
            value={timesTableRange}
            setState={setTimesTableRange}
          >
            {Array.from({ length: valueRanges.range }, (_, i) => i + 1).map(
              (num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              )
            )}
          </TopRowOption>
        </>
      ) : (
        <>
          <TopRowOption
            label="Minimum Value"
            value={minRange}
            setState={setMinRange}
          >
            {Array.from(
              {
                length:
                  valueRanges.minRange.range / valueRanges.minRange.interval,
              },
              (_, i) => i * valueRanges.minRange.interval
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </TopRowOption>

          <TopRowOption
            label="Max Value"
            value={maxRange}
            setState={setMaxRange}
          >
            {Array.from(
              {
                length:
                  valueRanges.maxRange.range / valueRanges.maxRange.interval,
              },
              (_, i) => (i + 1) * valueRanges.maxRange.interval
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </TopRowOption>
        </>
      )}
    </>
  );
}
