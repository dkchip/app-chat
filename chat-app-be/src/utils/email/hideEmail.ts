const hideEmail = (email: string) => {
    // Split the email address into local and domain parts
    const [localPart, domain] = email.split('@');

    // Determine the number of characters to show in the local part
    const charactersToShow = Math.min(3, localPart.length); // Show at least 3 characters

    // Replace characters in the local part with asterisks
    const hiddenLocalPart = localPart.substring(0, charactersToShow) + '*'.repeat(localPart.length - charactersToShow);

    // Combine the hidden local part with the domain and return the modified email
    return hiddenLocalPart + '@' + domain;
};

export default hideEmail;
