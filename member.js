function skillsMember() {
    var member = document.getElementById('member');
    var memberSkills = document.getElementById('member-skills');
    var memberSkillsText = document.getElementById('member-skills-text');

    if (member.checked) {
        memberSkills.style.display = 'block';
        memberSkillsText.style.display = 'block';
    } else {
        memberSkills.style.display = 'none';
        memberSkillsText.style.display = 'none';
    }
}