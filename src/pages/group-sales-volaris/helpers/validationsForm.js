// utils/ageValidation.ts

export const parseCustomDate = (dateStr) => {
    const parts = dateStr?.split(' ');
    if (parts.length !== 2) return null;

    const day = parts[1].slice(0, 2);
    const month = parts[1].slice(2, 5);
    const year = parts[1].slice(5);

    const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
    const date = new Date(`${month} ${day}, ${fullYear}`);
    return isNaN(date.getTime()) ? null : date;
};

export const AgePassenger = (birthDate) => {
    const birth = parseCustomDate(birthDate);
    if (!birth) return "Fecha inválida";

    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (years > 0) {
        return `${years} año${years > 1 ? "s" : ""}`;
    }

    if (days < 0) months--;

    return `${months} mes${months !== 1 ? "es" : ""}`;
}

export const calculateAgeAndSetPassengerType = ({
    birthDate,
    returnDateClean,
    setValue,
}) => {
    const returnDate = parseCustomDate(returnDateClean);
    const birthMoment = new Date(birthDate);

    if (!returnDate || isNaN(birthMoment.getTime())) return;

    const ageAtReturn = returnDate.getFullYear() - birthMoment.getFullYear();
    const monthDiff = returnDate.getMonth() - birthMoment.getMonth();
    const dayDiff = returnDate.getDate() - birthMoment.getDate();

    const isBirthdayBeforeReturn =
        monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);

    const finalAge = ageAtReturn - (isBirthdayBeforeReturn ? 0 : 1);

    if (finalAge >= 18) {
        setValue('typePassenger', 'adult');
    } else {
        setValue('typePassenger', 'child');
    }
};
