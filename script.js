fetch('https://my.api.mockaroo.com/users.json', {
    method: 'GET',
    headers: {
        'X-API-Key': '532e44f0'
    }
}).then(response => response.json())
    .then(data => {
        const users = data;
        let countries = {
            france: 0,
            italy: 0,
            germany: 0,
            usa: 0,
            china: 0,
            japan: 0,
        }
        let gender = {
            male: 0,
            female: 0,
            other: 0,
        }
        let income = {
            male: 0.0,
            female: 0.0,
            other: 0.0,
        }

        let table = "<table><tr>";

        for (const user in users[0]) {
            table += "<th>";
            table += user;
            table += "</th>";
        }
        table += "</tr>"
        for (let i = 0; i < users.length; i++) {
            table += "<tr>";
            for (let j = 0; j < Object.keys(users[i]).length; j++) {
                table += "<td>";
                table += Object.values(users[i])[j];
                table += "</td>";
            }
            table += "</tr>";

            if (Object.values(users[i])[6] === 'France') {
                countries['france']++;
            } else if (Object.values(users[i])[6] === 'Italy') {
                countries['italy']++;
            } else if (Object.values(users[i])[6] === 'Germany') {
                countries['germany']++;
            } else if (Object.values(users[i])[6] === 'United States') {
                countries['usa']++;
            } else if (Object.values(users[i])[6] === 'China') {
                countries['china']++;
            } else if (Object.values(users[i])[6] === 'Japan') {
                countries['japan']++;
            }

            if (Object.values(users[i])[4] === 'Male') {
                gender['male']++;
                income['male'] += parseFloat(Object.values(users[i])[5].slice(1));
            } else if (Object.values(users[i])[4] === 'Female') {
                gender['female']++;
                income['female'] += parseFloat(Object.values(users[i])[5].slice(1));
            } else {
                gender['other']++;
                income['other'] += parseFloat(Object.values(users[i])[5].slice(1));
            }
        }
        table += "</table>";
        document.getElementById('table').innerHTML = table;
        document.getElementById('france').innerHTML = countries['france'].toString();
        document.getElementById('italy').innerHTML = countries['italy'].toString();
        document.getElementById('germany').innerHTML = countries['germany'].toString();
        document.getElementById('usa').innerHTML = countries['usa'].toString();
        document.getElementById('china').innerHTML = countries['china'].toString();
        document.getElementById('japan').innerHTML = countries['japan'].toString();
        document.getElementById('males-count').innerHTML = gender['male'].toString();
        document.getElementById('males-income').innerHTML = (income['male'] / gender['male']).toString()
        document.getElementById('females-count').innerHTML = gender['female'].toString();
        document.getElementById('females-income').innerHTML = (income['female'] / gender['female']).toString()
        document.getElementById('other-count').innerHTML = gender['other'].toString();
        document.getElementById('other-income').innerHTML = (income['other'] / gender['other']).toString()

        const canvas = document.getElementById("nationalities").getContext("2d");
        const chart_nationalities = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ["France", "Italy", "Germany", "USA", "China", "Japan"],
                datasets: [{
                    data: [
                        countries['france'],
                        countries['italy'],
                        countries['germany'],
                        countries['usa'],
                        countries['china'],
                        countries['japan'],
                    ],
                    backgroundColor: [
                        'rgb(0,0,128, 1)',
                        'rgb(0,100,0, 1)',
                        'rgb(37,37,1)',
                        'rgba(42,124,231,1)',
                        'rgba(169,9,9,1)',
                        'rgb(190,190,190,1)',
                    ],
                    borderColor: [
                        'rgb(0,0,128, 1)',
                        'rgb(0,100,0, 1)',
                        'rgba(37,37,1)',
                        'rgba(42,124,231,1)',
                        'rgba(169,9,9,1)',
                        'rgba(190,190,190,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'top',
                    labels: {
                        fontColor: 'black'
                    }
                },
            }
        });

        const canvas2 = document.getElementById('income').getContext('2d');
        const chart_income = new Chart(canvas2, {
            type: 'line',
            data: {
                labels: ['Males', 'Females', 'Others'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Average income by gender',
                        backgroundColor: 'rgb(4,66,206)',
                        borderColor: 'rgb(0,0,0)',
                        data: [
                            income['male'] / gender['male'],
                            income['female'] / gender['female'],
                            income['other'] / gender['other'],
                        ],
                        fill: false,
                        yAxisID: 'y-axis-1'
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            ticks: {
                                fontColor: 'rgb(0,0,0)',
                                borderColor: 'rgb(0,0,0)',
                                beginAtZero: true
                            }
                        },
                    ],
                    xAxes: [{
                        ticks: {
                            fontColor: 'black'
                        }
                    }]
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        fontColor: 'black'
                    }
                }
            }
        });
    });